const query = new URLSearchParams(window.location.search);
const code = query.get('code');
const message = document.getElementById('message');
const form = document.getElementById('survey-form');
const content = document.getElementById('survey-content');

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
    renderSurvey(data.categories);
  } catch (error) {
    message.textContent = error.message;
  }
}

function renderSurvey(categories) {
  content.innerHTML = '';
  categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `<h2>${category.nombre}</h2>`;
    category.preguntas.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `
        <p>${question.texto}</p>
        <label><input type="radio" name="q${question.id}" value="Sí" required> Sí</label>
        <label><input type="radio" name="q${question.id}" value="No" required> No</label>
      `;
      categoryDiv.appendChild(questionDiv);
    });
    content.appendChild(categoryDiv);
  });
}

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