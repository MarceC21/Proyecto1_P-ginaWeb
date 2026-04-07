// Punto de entrada de la aplicación
import { loadPosts } from "./posts/posts.js";
import { renderIdle } from "./compartido/states.js";
import { loadTagOptions } from "./search/search.js"; 

document.addEventListener("DOMContentLoaded", () => {
    
    const container = document.getElementById("postsContainer");

    // Estado inicial
    renderIdle(container);

    // Cargar posts
    loadPosts(1);

    // Cargar opciones de tags para el filtro
    loadTagOptions();

});
