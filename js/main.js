// Punto de entrada de la aplicación
import { loadPosts } from "./posts/posts.js";
import { renderIdle } from "./compartido/states.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const container = document.getElementById("postsContainer");

    // Estado inicial
    renderIdle(container);

    // Cargar posts
    loadPosts(1);
});
