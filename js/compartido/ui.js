// Componentes compartidos, como botones o las cards de cada post
// =========================    


// Card de un post (para mostrar en la lista de posts)
//Por el momento solo muestra el título, un extracto del body y el autor (userId)
//FALTA AGREGAR EL BOTPN DE VER MÁS (QUE LLEVE AL DETALLE DEL POST)
export function PostCard(post){
        return `
        <li class="post-card">
            <h3 class="card-title">${post.title}</h3>
            
            <p class="card-body">
                ${post.body.substring(0, 100)}...
            </p>
            
            <p class="card-author">
                Autor: Usuario ${post.userId}
            </p>

            
        </li>
    `;
}