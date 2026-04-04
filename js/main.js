// Punto de entrada de la aplicación
import { loadPosts } from "./posts/posts.js";
import { renderIdle } from "./compartido/states.js";
//import "./search/search.js"; // Para que la lógica de búsqueda se ejecute y se puedan usar sus funciones

document.addEventListener("DOMContentLoaded", () => {
    
    const container = document.getElementById("postsContainer");

    // Estado inicial
    renderIdle(container);

    // Cargar posts
    loadPosts(1);



});
