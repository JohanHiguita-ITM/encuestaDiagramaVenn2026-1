const query = new URLSearchParams(window.location.search);
const code = query.get('code');
const message = document.getElementById('message');
const form = document.getElementById('survey-form');
const content = document.getElementById('survey-content');
const tabs = document.getElementById('tabs');
const progressFill = document.getElementById('progress-fill');
const nextButton = document.getElementById('next-button');
const prevButton = document.getElementById('prev-button');
const submitButton = document.getElementById('submit-button');

let categories = [];
let currentCategoryIndex = 0;
let currentPageInCategory = 0;
const QUESTIONS_PER_PAGE = 5;
let autoAdvanceTimeout = null;
let savedResponses = {};

async function validateAndLoadSurvey() {
  if (!code) {
    window.location.href = '/login';
    return;
  }

  try {
    const response = await fetch(`/participant/validate/${encodeURIComponent(code)}`);
    if (!response.ok) {
      window.location.href = '/login';
      return;
    }
    const data = await response.json();
    if (!data.valid) {
      window.location.href = '/login';
      return;
    }
    if (data.needsInfo) {
      window.location.href = `/participant/info?code=${encodeURIComponent(code)}`;
      return;
    }
    loadSurvey();
  } catch (error) {
    window.location.href = '/login';
  }
}

async function loadSurvey() {
  try {
    const response = await fetch('/survey/data');
    if (!response.ok) {
      throw new Error('Failed to load survey');
    }
    const data = await response.json();
    categories = data.categories;
    
    // Load existing responses for this participant
    const savedResp = await fetch(`/survey/responses/${encodeURIComponent(code)}`)
      .then(res => res.ok ? res.json() : Promise.resolve({ responses: [] }))
      .catch(() => ({ responses: [] }));
    
    // Create a map of saved responses for easy lookup
    if (savedResp.responses) {
      savedResp.responses.forEach(resp => {
        savedResponses[resp.id_pregunta] = resp.valor;
      });
    }
    
    renderTabs();
    showCategory(0);
    updateProgress();
  } catch (error) {
    message.textContent = error.message;
  }
}

function renderTabs() {
  tabs.innerHTML = '';
  categories.forEach((category, index) => {
    const tabButton = document.createElement('button');
    tabButton.className = 'tab-button';
    tabButton.textContent = category.nombre;
    tabButton.onclick = () => showCategory(index);
    tabs.appendChild(tabButton);
  });
}

function showCategory(index) {
  currentCategoryIndex = index;
  currentPageInCategory = 0;
  showCategoryPage();
}

function showCategoryPage() {
  content.innerHTML = '';
  const category = categories[currentCategoryIndex];
  
  // Calculate pagination
  const totalQuestions = category.preguntas.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const startIdx = currentPageInCategory * QUESTIONS_PER_PAGE;
  const endIdx = Math.min(startIdx + QUESTIONS_PER_PAGE, totalQuestions);
  const pageQuestions = category.preguntas.slice(startIdx, endIdx);

  const categoryDiv = document.createElement('div');
  categoryDiv.className = 'category-questions';
  categoryDiv.innerHTML = `<h2>${category.nombre}</h2>`;
  
  // Add page indicator
  if (totalPages > 1) {
    categoryDiv.innerHTML += `<p style="text-align: center; color: #666; margin-bottom: 15px;">Página ${currentPageInCategory + 1} de ${totalPages}</p>`;
  }

  // Add dot buttons for questions in current page
  if (totalPages > 1) {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots-container';
    dotsContainer.style.cssText = 'display: flex; gap: 8px; margin-bottom: 20px; justify-content: center; flex-wrap: wrap;';
    
    pageQuestions.forEach((question, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'dot-button';
      dot.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 2px solid #4CAF50;
        background-color: #f0f0f0;
        cursor: pointer;
        padding: 0;
      `;
      dot.title = `Pregunta ${startIdx + idx + 1}`;
      
      // Check if this question is answered (from form or from database)
      const isAnswered = document.querySelectorAll(`input[name="q${question.id}"]:checked`).length > 0 
        || (savedResponses && savedResponses[question.id]);
      if (isAnswered) {
        dot.style.backgroundColor = '#4CAF50';
      }
      
      categoryDiv.appendChild(dotsContainer);
      dotsContainer.appendChild(dot);
    });
  }

  pageQuestions.forEach(question => {
    // Get previously saved answer for this question from form or from database
    let previousAnswer = null;
    
    // First check form data
    const formData = new FormData(form);
    previousAnswer = formData.get(`q${question.id}`);
    
    // If not in form, check saved responses from database
    if (!previousAnswer && savedResponses && savedResponses[question.id]) {
      previousAnswer = savedResponses[question.id];
    }
    
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    
    const yesChecked = previousAnswer === 'Sí' ? 'checked' : '';
    const noChecked = previousAnswer === 'No' ? 'checked' : '';
    
    questionDiv.innerHTML = `
      <p>${question.texto}</p>
      <label><input type="radio" name="q${question.id}" value="Sí" ${yesChecked}> Sí</label>
      <label><input type="radio" name="q${question.id}" value="No" ${noChecked}> No</label>
    `;
    categoryDiv.appendChild(questionDiv);
  });

  content.appendChild(categoryDiv);

  // Add event listeners to radio buttons on current page
  const radios = content.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateDotButtons();
      checkCategoryComplete();
    });
  });

  // Update tab active state
  const tabButtons = tabs.querySelectorAll('.tab-button');
  tabButtons.forEach((btn, i) => {
    btn.classList.toggle('active', i === currentCategoryIndex);
  });

  updateProgress();
  updatePageNavigation();
  checkCategoryComplete();
}

function updateDotButtons() {
  const dots = document.querySelectorAll('.dot-button');
  const category = categories[currentCategoryIndex];
  const totalQuestions = category.preguntas.length;
  const startIdx = currentPageInCategory * QUESTIONS_PER_PAGE;
  const endIdx = Math.min(startIdx + QUESTIONS_PER_PAGE, totalQuestions);
  const pageQuestions = category.preguntas.slice(startIdx, endIdx);
  
  dots.forEach((dot, idx) => {
    const question = pageQuestions[idx];
    const isAnswered = document.querySelectorAll(`input[name="q${question.id}"]:checked`).length > 0 
      || (savedResponses && savedResponses[question.id]);
    dot.style.backgroundColor = isAnswered ? '#4CAF50' : '#f0f0f0';
  });
}

function updatePageNavigation() {
  const category = categories[currentCategoryIndex];
  const totalQuestions = category.preguntas.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  
  if (totalPages > 1) {
    let pageNav = document.getElementById('page-navigation');
    
    if (!pageNav) {
      pageNav = document.createElement('div');
      pageNav.id = 'page-navigation';
      pageNav.className = 'page-navigation';
      pageNav.innerHTML = `
        <button type="button" class="nav-button" id="prev-page-button">← Página Anterior</button>
        <button type="button" class="nav-button" id="next-page-button">Página Siguiente →</button>
      `;
      content.appendChild(pageNav);
      
      document.getElementById('prev-page-button').addEventListener('click', () => {
        if (currentPageInCategory > 0) {
          currentPageInCategory--;
          showCategoryPage();
        }
      });
      
      document.getElementById('next-page-button').addEventListener('click', () => {
        if (currentPageInCategory < totalPages - 1) {
          currentPageInCategory++;
          showCategoryPage();
        }
      });
    }
    
    const prevPageBtn = document.getElementById('prev-page-button');
    const nextPageBtn = document.getElementById('next-page-button');
    if (prevPageBtn) prevPageBtn.disabled = currentPageInCategory === 0;
    if (nextPageBtn) nextPageBtn.disabled = currentPageInCategory >= totalPages - 1;
  } else {
    const pageNav = document.getElementById('page-navigation');
    if (pageNav) pageNav.remove();
  }
}

function updateProgress() {
  const progress = ((currentCategoryIndex + 1) / categories.length) * 100;
  progressFill.style.width = `${progress}%`;
}

function checkCategoryComplete() {
  const category = categories[currentCategoryIndex];
  const totalQuestions = category.preguntas.length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const startIdx = currentPageInCategory * QUESTIONS_PER_PAGE;
  const endIdx = Math.min(startIdx + QUESTIONS_PER_PAGE, totalQuestions);
  const pageQuestions = category.preguntas.slice(startIdx, endIdx);

  // Check if all questions on current page are answered
  const currentPageAnswered = pageQuestions.every(q => {
    const radios = document.querySelectorAll(`input[name="q${q.id}"]:checked`);
    return radios.length > 0;
  });

  // Check if all questions in entire category are answered
  const allCategoryAnswered = category.preguntas.every(q => {
    const radios = document.querySelectorAll(`input[name="q${q.id}"]:checked`);
    return radios.length > 0;
  });

  // Update button visibility
  prevButton.style.display = currentCategoryIndex > 0 ? 'block' : 'none';
  
  if (currentCategoryIndex < categories.length - 1) {
    // Enable next category button when all questions in category are answered
    nextButton.style.display = allCategoryAnswered ? 'block' : 'none';
    submitButton.style.display = 'none';
    
    // Auto-advance to next category after 1 second when all answered
    if (allCategoryAnswered) {
      // Clear any existing timeout
      if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
      }
      
      autoAdvanceTimeout = setTimeout(() => {
        const stillAnswered = category.preguntas.every(q => {
          const radios = document.querySelectorAll(`input[name="q${q.id}"]:checked`);
          return radios.length > 0;
        });
        if (stillAnswered && currentCategoryIndex < categories.length - 1) {
          autoAdvanceTimeout = null;
          showCategory(currentCategoryIndex + 1);
        }
      }, 1000);
    } else {
      // Clear timeout if questions become unanswered
      if (autoAdvanceTimeout) {
        clearTimeout(autoAdvanceTimeout);
        autoAdvanceTimeout = null;
      }
    }
  } else {
    nextButton.style.display = 'none';
    submitButton.style.display = allCategoryAnswered ? 'block' : 'none';
    
    // Clear timeout on last category
    if (autoAdvanceTimeout) {
      clearTimeout(autoAdvanceTimeout);
      autoAdvanceTimeout = null;
    }
  }
}

nextButton.addEventListener('click', () => {
  if (currentCategoryIndex < categories.length - 1) {
    showCategory(currentCategoryIndex + 1);
  }
});

prevButton.addEventListener('click', () => {
  if (currentCategoryIndex > 0) {
    showCategory(currentCategoryIndex - 1);
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = 'Enviando...';

  const formData = new FormData(form);
  const responses = [];
  for (let [key, value] of formData.entries()) {
    if (key.startsWith('q')) {
      const id_pregunta = parseInt(key.substring(1));
      responses.push({ id_pregunta, valor: value });
    }
  }

  try {
    const response = await fetch('/survey/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, responses })
    });
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Failed to submit responses');
    }
    message.textContent = 'Respuestas enviadas exitosamente. Gracias por participar.';
    form.style.display = 'none';
  } catch (error) {
    message.textContent = error.message;
  }
});

validateAndLoadSurvey();