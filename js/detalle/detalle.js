// Toda la lógica relacionada a los detalles de los posts
import { renderPostDetail } from "./detalleUI.js";

const detailContainer = document.getElementById("detailContainer");
const detailState = document.getElementById("detailState");

function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function initDetailPage() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    detailState.textContent = "No se encontró el ID del post en la URL.";
    detailContainer.innerHTML = "";
    return;
  }

  detailState.textContent = `Mostrando detalle del post con ID: ${postId}`;
  detailContainer.innerHTML = renderPostDetail({
    id: postId,
    title: "Título temporal del post",
    userId: "-",
    body: "Aquí luego se cargará el contenido real desde la API."
  });
}

initDetailPage();