document.getElementById('login-form').addEventListener('submit', function(event) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message');

  if (!username || !password) {
    event.preventDefault();
    message.textContent = 'Please fill in all fields.';
    return;
  }

  // Additional client-side validation can be added here
  // For now, let the form submit
});