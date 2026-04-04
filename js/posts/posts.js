// Toda la lógica relacionada a los posts que se muestran en la pagina principal


import { getPosts } from "../api/api.js";
import { renderLoading, renderError } from "../compartido/states.js";
import { renderPosts } from "./postsUI.js";


// referencia al contenedor de posts en el DOM
const postsContainer = document.getElementById("postsContainer");

// lista de posts (estado global para la sección de posts)
let posts = [];


// Función para cargar los posts al inicio

export async function loadPosts() {

    renderLoading(postsContainer);

    try {
        const data = await getPosts();

        posts = data.posts;

        renderPosts(postsContainer, posts);

    } catch (error) {
        console.error("Error al cargar los posts:", error);

        renderError(postsContainer, loadPosts);
    }
}



