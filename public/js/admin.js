document.getElementById('new-participant').addEventListener('click', async () => {
  const message = document.getElementById('message');
  message.textContent = 'Creating participant...';

  try {
    const response = await fetch('/admin/participants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) {
      throw new Error('Failed to create participant');
    }

    const participant = await response.json();
    message.textContent = `New participant created with code: ${participant.codigo}`;
    await loadParticipants();
  } catch (error) {
    message.textContent = error.message;
  }
});

async function loadParticipants() {
  const tbody = document.querySelector('#participants-table tbody');
  tbody.innerHTML = '';
  const response = await fetch('/admin/participants');
  const data = await response.json();

  data.forEach(participant => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${participant.id_participante}</td>
      <td>${participant.codigo || ''}</td>
      <td>${participant.edad || ''}</td>
      <td>${participant.genero || ''}</td>
      <td>${participant.carrera || ''}</td>
      <td>${participant.semestre || ''}</td>
    `;
    tbody.appendChild(row);
  });
}

loadParticipants().catch(error => {
  document.getElementById('message').textContent = 'Unable to load participants.';
});