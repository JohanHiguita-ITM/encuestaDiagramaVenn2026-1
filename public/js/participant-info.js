const query = new URLSearchParams(window.location.search);
const code = query.get('code');
const message = document.getElementById('message');
const codeInput = document.getElementById('code');

if (!code) {
  message.textContent = 'Missing participant code. Please login again.';
  document.getElementById('info-form').style.display = 'none';
} else {
  codeInput.value = code;
}

document.getElementById('info-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  message.textContent = 'Saving...';

  const payload = {
    code: codeInput.value,
    edad: parseInt(document.getElementById('edad').value, 10),
    genero: document.getElementById('genero').value.trim(),
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

    window.location.href = '/dashboard';
  } catch (error) {
    message.textContent = error.message;
  }
});