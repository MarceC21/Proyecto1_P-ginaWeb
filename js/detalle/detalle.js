// Toda la lógica relacionada a los detalles de los posts
import { getPostById } from "../api/api.js";
import { renderPostDetail } from "./detalleUI.js";

const detailContainer = document.getElementById("detailContainer");
const detailState = document.getElementById("detailState");

function getPostIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function showDetailState(message) {
  detailState.textContent = message;
}

function clearDetail() {
  detailContainer.innerHTML = "";
}

async function initDetailPage() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    showDetailState("No se encontró el ID del post en la URL.");
    clearDetail();
    return;
  }

  showDetailState("Cargando detalle del post...");
  clearDetail();

  try {
    const post = await getPostById(postId);
    showDetailState(`Mostrando detalle del post con ID: ${postId}`);
    detailContainer.innerHTML = renderPostDetail(post);
  } catch (error) {
    showDetailState("Error al cargar el detalle del post.");
    clearDetail();
    console.error("Error al obtener el detalle:", error);
  }
}

initDetailPage();