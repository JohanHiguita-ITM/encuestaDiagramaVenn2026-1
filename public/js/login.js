document.getElementById('login-form').addEventListener('submit', function(event) {
  const codigo = document.getElementById('codigo').value.trim();
  const message = document.getElementById('message');

  if (!codigo) {
    event.preventDefault();
    message.textContent = 'Por favor ingresa tu código de participante.';
    return;
  }
});