// Render de los detalles de los posts
export function renderPostDetail(post) {
  return `
    <h2>${post.title}</h2>
    <p><strong>ID:</strong> ${post.id}</p>
    <p><strong>Usuario:</strong> ${post.userId ?? "No disponible"}</p>
    <p>${post.body}</p>
  `;
}