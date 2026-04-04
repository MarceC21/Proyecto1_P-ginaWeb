// Toda la lógica relacionada a los posts que se muestran en la pagina principal


import { getPostsRange } from "../api/api.js";
import { renderLoading, renderError } from "../compartido/states.js";
import { renderPosts, renderPagination } from "./postsUI.js";


// referencia al contenedor de posts en el DOM
const postsContainer = document.getElementById("postsContainer");
const paginationContainer = document.getElementById("pagination");


// Variables iniciales para paginación
let currentPage = 1;
let postsPerPage = 10;
let totalPosts = 0;

// Función para cargar posts con paginación
export async function loadPosts(page = 1) {
    currentPage = page; 
    // Calcular el skip para la paginación
    const skip = (currentPage - 1) * postsPerPage;

    renderLoading(postsContainer);

    try {
        const data = await getPostsRange(skip, postsPerPage);
        totalPosts = data.total;

        renderPosts(postsContainer, data.posts);
        renderPagination(paginationContainer, {
            currentPage,
            postsPerPage,
            totalPosts,
            onPageChange: loadPosts,
            onLimitChange: (newLimit) => {
                postsPerPage = newLimit;
                loadPosts(1); // SIEMPRE volver a página 1
            }
        });

    } catch (error) {
        console.error("Error al cargar los posts:", error);
        renderError(postsContainer, () => loadPosts(currentPage));
    }
}



