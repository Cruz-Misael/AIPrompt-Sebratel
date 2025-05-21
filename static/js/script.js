function showTypingIndicator() {
  document.getElementById('typing-indicator').style.display = 'block';
}

function hideTypingIndicator() {
  document.getElementById('typing-indicator').style.display = 'none';
}

async function sendMessage() {
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  input.value = '';
  showTypingIndicator();

  try {
    const res = await fetch('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    hideTypingIndicator();
    addMessage(data.response, 'bot');
  } catch (err) {
    hideTypingIndicator();
    addMessage('Erro ao conectar com a IA.', 'bot');
  }
}

function addMessage(text, sender) {
  const chat = document.getElementById('chat');
  const div = document.createElement('div');
  div.className = `message ${sender}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Evita quebra de linha se for um <textarea>
    sendMessage(); // Chama a função de envio
  }
});

