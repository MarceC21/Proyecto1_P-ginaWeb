//Todo lo del render de los posts. Lo de pintar las cards y paginación
// postsUI.js

import { PostCard } from "../compartido/ui.js";
import { renderEmpty, renderSuccess } from "../compartido/states.js";

//el render de los posts
export function renderPosts(container, posts) {

    if (!posts || posts.length === 0) {
        renderEmpty(container);
        return;
    }

    const postsHTML = posts.map(post => PostCard(post)).join("");

    renderSuccess(container, postsHTML);
}

// Función para renderizar la paginación, recibe un objeto con la info necesaria para mostrar la paginación
// la dificil 
export function renderPagination(container, { currentPage, postsPerPage, totalPosts, onPageChange, onLimitChange }) {

    // 1. Calcular cuántas páginas existen en totals
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // 2. Referencias a los elementos del DOM
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const pageInfo = document.getElementById("pageInfo");
    const limitSelect = document.getElementById("limitSelect");

    // 3. Actualizar la info visual de la paginación, muestra en qué página está el usuario
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;

    // Deshabilitar botones cuando no se pueden usar
    prevBtn.disabled = currentPage === 1;               // No puede ir atrás en la página 1
    nextBtn.disabled = currentPage === totalPages;      // No puede avanzar en la última página

    // Mostrar el valor actual del límite seleccionado
    limitSelect.value = String(postsPerPage);

    // 4. Asignar eventos 
    // onclick y onchange sobrescriben eventos anteriores automáticamente, en vez de usar addEventListener, para evitar tener que limpiar eventos anteriores 
    // (en caso de que se vuelva a hacer render de la paginación con nueva info)
   
    // Botón "Anterior"
    prevBtn.onclick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // Botón "Siguiente"
    nextBtn.onclick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Selector de cantidad de posts por página
    limitSelect.onchange = (e) => {
        const newLimit = Number(e.target.value);
        onLimitChange(newLimit); // La lógica decide qué hacer con el nuevo límite (en este caso, recargar desde la página 1)
    };
}