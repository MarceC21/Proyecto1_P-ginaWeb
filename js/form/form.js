// Toda la lógica relacionada a los formularios de creación de posts
import { showFormMessage } from "./formUI.js";

const postForm = document.getElementById("postForm");
const formMessage = document.getElementById("formMessage");

function getFormData() {
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const userId = document.getElementById("userId").value.trim();

  return {
    title,
    body,
    userId
  };
}

function initFormPage() {
  showFormMessage(formMessage, "Formulario listo para crear publicaciones.", "info");

  postForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = getFormData();

    console.log("Datos del formulario:", formData);

    showFormMessage(
      formMessage,
      `Formulario capturado: título "${formData.title || "sin título"}"`,
      "info"
    );
  });
}

initFormPage();