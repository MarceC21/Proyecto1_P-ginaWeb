// Toda la lógica relacionada a los detalles de los posts
import { getPostById, deletePost } from "../api/api.js";
import { renderPostDetail, renderDeletedPostState } from "./detalleUI.js";

const detailContainer = document.getElementById("detailContainer");
const detailState = document.getElementById("detailState");
const DELETED_POSTS_KEY = "deletedPosts";

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

function getDeletedPosts() {
  const storedDeletedPosts = localStorage.getItem(DELETED_POSTS_KEY);
  return storedDeletedPosts ? JSON.parse(storedDeletedPosts) : [];
}

function saveDeletedPosts(postIds) {
  localStorage.setItem(DELETED_POSTS_KEY, JSON.stringify(postIds));
}

function isPostDeleted(postId) {
  return getDeletedPosts().includes(String(postId));
}

function markPostAsDeleted(postId) {
  const deletedPosts = getDeletedPosts();
  const normalizedPostId = String(postId);

  if (!deletedPosts.includes(normalizedPostId)) {
    deletedPosts.push(normalizedPostId);
    saveDeletedPosts(deletedPosts);
  }
}

function renderDeletedView(postId) {
  showDetailState("Publicación eliminada correctamente.");
  detailContainer.innerHTML = renderDeletedPostState(postId);
}

function bindDeleteButton(postId) {
  const deleteButton = document.getElementById("deletePostBtn");

  if (!deleteButton) {
    return;
  }

  deleteButton.addEventListener("click", async () => {
    const confirmed = window.confirm("¿Seguro que deseas eliminar esta publicación?");

    if (!confirmed) {
      return;
    }

    deleteButton.disabled = true;
    deleteButton.textContent = "Eliminando...";
    showDetailState("Eliminando publicación...");

    try {
      await deletePost(postId);
    } catch (error) {
      console.warn("No se pudo eliminar en la API. Se simulará visualmente.", error);
    }

    markPostAsDeleted(postId);
    renderDeletedView(postId);
  });
}

async function initDetailPage() {
  const postId = getPostIdFromUrl();

  if (!postId) {
    showDetailState("No se encontró el ID del post en la URL.");
    clearDetail();
    return;
  }

  if (isPostDeleted(postId)) {
    renderDeletedView(postId);
    return;
  }

  showDetailState("Cargando detalle del post...");
  clearDetail();

  try {
    const post = await getPostById(postId);
    showDetailState(`Mostrando detalle del post con ID: ${postId}`);
    detailContainer.innerHTML = renderPostDetail(post);
    bindDeleteButton(post.id ?? postId);
  } catch (error) {
    showDetailState("Error al cargar el detalle del post.");
    clearDetail();
    console.error("Error al obtener el detalle:", error);
  }
}

initDetailPage();