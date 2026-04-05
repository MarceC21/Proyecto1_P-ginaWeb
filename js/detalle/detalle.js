// Toda la lógica relacionada a los detalles de los posts
import { getPostById } from "../api/api.js";
import { renderPostDetail } from "./detalleUI.js";

const detailContainer = document.getElementById("detailContainer");
const detailState = document.getElementById("detailState");

function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function initDetailPage() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    detailState.textContent = "No se encontró el ID del post en la URL.";
    detailContainer.innerHTML = "";
    return;
  }

  detailState.textContent = "Cargando detalle del post...";

  try {
    const post = await getPostById(postId);
    detailState.textContent = `Mostrando detalle del post con ID: ${postId}`;
    detailContainer.innerHTML = renderPostDetail(post);
  } catch (error) {
    detailState.textContent = "Error al cargar el detalle del post.";
    detailContainer.innerHTML = "";
    console.error(error);
  }
}

initDetailPage();