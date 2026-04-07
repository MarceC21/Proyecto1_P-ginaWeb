// Render de los detalles de los posts
export function renderPostDetail(post) {
  return `
    <span class="detail-category">Publicación</span>
    <h1 class="detail-title">${post.title}</h1>

    <div class="detail-meta">
      <span><strong>ID:</strong> ${post.id}</span>
      <span><strong>Usuario:</strong> ${post.userId ?? "No disponible"}</span>
    </div>

    <div class="detail-body">
      <p>${post.body}</p>
    </div>

    <div class="detail-actions">
      <button type="button" id="deletePostBtn" class="detail-delete-btn">Eliminar post</button>
    </div>
  `;
}

export function renderDeletedPostState(postId) {
  return `
    <div class="detail-deleted-box">
      <p class="detail-deleted-title">Publicación eliminada</p>
      <p class="detail-deleted-text">El post con ID ${postId} ya no está disponible.</p>
    </div>
  `;
}