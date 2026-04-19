const query = new URLSearchParams(window.location.search);
const code = query.get('code');
const message = document.getElementById('message');
const codeInput = document.getElementById('code');
const form = document.getElementById('info-form');

async function validateAndLoadForm() {
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

    codeInput.value = code;
    form.style.display = 'block';
  } catch (error) {
    window.location.href = '/login';
  }
}

validateAndLoadForm();

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = 'Saving...';

  const generoSelect = document.getElementById('genero');
  const generoValues = Array.from(generoSelect.selectedOptions).map(option => option.value).join(', ');

  const payload = {
    code: codeInput.value,
    edad: parseInt(document.getElementById('edad').value, 10),
    genero: generoValues,
    carrera: document.getElementById('carrera').value.trim(),
    semestre: parseInt(document.getElementById('semestre').value, 10)
  };

  try {
    const response = await fetch('/participant/info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.error || 'Unable to save information');
    }

    window.location.href = '/surveys';
  } catch (error) {
    message.textContent = error.message;
  }
});