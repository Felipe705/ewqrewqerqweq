const chatButton = document.getElementById("chat-button");
const chatModal = document.getElementById("chat-modal");
const overlay = document.getElementById("overlay");

chatButton.addEventListener("click", () => {
  chatModal.style.display = "flex";
  overlay.style.display = "block";
});

overlay.addEventListener("click", () => {
  chatModal.style.display = "none";
  overlay.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  sendButton = document.getElementById("enviado")

  sendButton.addEventListener("click", () => {
    const event = new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
    });
    input.dispatchEvent(event);
  });

  

  const input = document.getElementById("chat-input");
  const chatBody = document.querySelector(".chat-body");
  const bottaoEnviar = document.getElementById("enviado");
  const messages = [];

  function addMessage(from, text) {
    const msg = document.createElement("p");
    msg.className = `message ${from}`;
    msg.textContent = (from === "user" ? "Você: " : "Teo: ") + text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    messages.push({ from: "user", text });
    addMessage("user", text);
    input.value = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });

      const data = await res.json();
      messages.push({ from: "bot", text: data.reply });
      addMessage("Teo", data.reply);
    } catch (err) {
      addMessage("Teo", "Erro ao se conectar com a IA 😕");
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  bottaoEnviar.addEventListener("onclickOn", () => {
    addMessage()
  })
});

document.getElementById('iniciar').addEventListener('click', function() {
  document.getElementById('chat-modal').style.display = 'flex';
});

// function sendMessage() {
//   const input = document.getElementById("chat-input");
//   const message = input.value.trim();
//   if (message) {
//     console.log("Usuário:", message);
//     input.value = "";
//   }
// }