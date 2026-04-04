// Render para actualizar la UI de búsqueda con los resultados obtenidos

import { PostCard } from "../compartido/ui.js";
import { renderEmpty, renderSuccess } from "../compartido/states.js";

export function renderSearchResults(container, posts) {

    // Si no hay resultados
    if (!posts || posts.length === 0) {
        renderEmpty(container);
        return;
    }

    // Generar HTML de los posts
    const postsHTML = posts.map(post => PostCard(post)).join("");

    // Mostrar resultados
    renderSuccess(container, postsHTML);
}