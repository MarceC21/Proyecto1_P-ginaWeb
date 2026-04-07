export function PostCard(post) {
  return `
    <li class="post-card">
      <h3 class="card-title">${post.title}</h3>
      <p class="card-body">${post.body.substring(0, 100)}...</p>
      <p class="card-author">Usuario ${post.userId}</p>
      <div class="card-footer">
        <a href="pages/vistaDetalle.html?id=${post.id}">
          <button type="button">Ver más</button>
        </a>
      </div>
    </li>`;
}