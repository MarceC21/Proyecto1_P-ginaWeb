// Render del formulario para mensajes y limpiarlo después de enviar
export function showFormMessage(container, message, type = "info") {
  container.textContent = message;
  container.className = "";
  container.classList.add(`message-${type}`);
}