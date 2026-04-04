// Toda la lógica relacionada a los formularios de creación de posts
import { showFormMessage } from "./formUI.js";

const postForm = document.getElementById("postForm");
const formMessage = document.getElementById("formMessage");

function initFormPage() {
  showFormMessage(formMessage, "Formulario listo para crear publicaciones.", "info");

  postForm.addEventListener("submit", (event) => {
    event.preventDefault();
    showFormMessage(formMessage, "Luego conectaremos este formulario al POST.", "info");
  });
}

initFormPage();