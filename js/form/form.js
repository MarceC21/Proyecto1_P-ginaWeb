// Toda la lógica relacionada a los formularios de creación de posts
import { createPost } from "../api/api.js";
import { showFormMessage } from "./formUI.js";
import { validarPost } from "../compartido/validaciones.js";

const postForm = document.getElementById("postForm");
const formMessage = document.getElementById("formMessage");

function getFormData() {
  const title = document.getElementById("title").value.trim();
  const body = document.getElementById("body").value.trim();
  const userId = document.getElementById("userId").value.trim();

  return {
    title,
    body,
    userId: Number(userId)
  };
}

function clearForm() {
  postForm.reset();
}

function initFormPage() {
  showFormMessage(formMessage, "Formulario listo para crear publicaciones.", "info");

  postForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = getFormData();
    const validation = validarPost({
      ...formData,
      userId: String(formData.userId)
    });

    if (!validation.isValid) {
      showFormMessage(formMessage, validation.errors.join(" "), "error");
      return;
    }

    showFormMessage(formMessage, "Enviando publicación...", "info");

    try {
      const createdPost = await createPost(formData);

      console.log("Post creado:", createdPost);

      showFormMessage(
        formMessage,
        `Publicación creada con éxito. ID recibido: ${createdPost.id}`,
        "success"
      );

      clearForm();
    } catch (error) {
      console.error("Error al crear el post:", error);
      showFormMessage(formMessage, "No se pudo crear la publicación.", "error");
    }
  });
}

initFormPage();