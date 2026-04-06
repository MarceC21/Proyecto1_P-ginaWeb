// Toda la lógica para manejar la búsqueda de los posts

import { searchPosts, getPostsByUser, getPostsByTag, getPostsTagList } from "../api/api.js";
import { renderLoading, renderError } from "../compartido/states.js";
import { renderSearchResults } from "./searchUI.js";

// Referencias al DOM
const postsContainer = document.getElementById("postsContainer");
const searchInput    = document.getElementById("searchInput");
const searchButton   = document.getElementById("searchButton");
const searchType     = document.getElementById("searchType");
const tagSelect      = document.getElementById("tagSelect");

const searchStatusEl = document.getElementById("searchStatus");
const clearBtn       = document.getElementById("clearSearchBtn");
const paginationEl   = document.getElementById("pagination");

// Estado
let isSearchActive = false;


// Esto es para que se oculte el botón de limpiar búsqueda al inicio, ya que no hay búsqueda activa
clearBtn.hidden = true;
tagSelect.hidden = true;

//funciones para mostrar/ocultar lo de la paginación
function showSearchMode() {
    isSearchActive = true;
    paginationEl.hidden = true;
    clearBtn.hidden = false;
}

//Esto es para volver al modo normal de mostrar posts, ocultando la UI de búsqueda y mostrando la paginación
function hideSearchMode() {
    isSearchActive = false;
    paginationEl.hidden = false;
    clearBtn.hidden = true;

    searchStatusEl.textContent = "Estado: esperando búsqueda…";

    searchInput.value = "";
    tagSelect.value = "";

    // Ocultar select de tags y mostrar input
    tagSelect.hidden = true;
    searchInput.hidden = false;
}

// Esta es la función principal que recibe una función de búsqueda (fetchFn) para los tres tipos de búsqueda (texto, usuario, tag)
async function performSearch(fetchFn) {
    showSearchMode();
    renderLoading(postsContainer);
    searchStatusEl.textContent = "Estado: buscando...";

    try {
        const data = await fetchFn();
        const posts = data.posts;

        renderSearchResults(postsContainer, posts);

        searchStatusEl.textContent = posts.length === 0
            ? "Estado: sin resultados"
            : `Estado: ${posts.length} resultado(s) encontrado(s)`;

    } catch (error) {
        console.error("Error en búsqueda:", error);
        searchStatusEl.textContent = "Estado: error al buscar";
        renderError(postsContainer, () => performSearch(fetchFn));
    }
}

// Esta función es para cargar una lista de tags, para que el usuario pueda seleccionarlos

export async function loadTagOptions() {
    try {
        const tags = await getPostsTagList();

        // Opción inicial
        tagSelect.innerHTML = `<option value="">-- Selecciona un tag --</option>`;

        tags.forEach(tag => {
            const option = document.createElement("option");
            option.value = tag;
            option.textContent = tag;
            tagSelect.appendChild(option);
        });

    } catch (e) {
        console.warn("No se pudieron cargar los tags:", e);
    }
}

//Esta parte es para manejar el cambio de tipo de búsqueda (texto, usuario, tag) y mostrar/ocultar los inputs correspondientes

searchType.onchange = () => {
    const type = searchType.value;

    if (type === "tag") {
        // Mostrar select de tags
        tagSelect.hidden = false;
        searchInput.hidden = true;
    } else {
        // Mostrar input
        tagSelect.hidden = true;
        searchInput.hidden = false;
    }
};

// Ahora dependiendo del tipo de búsqueda es la función que se le pasa a performSearch, que es la que hace el fetch a la API para obtener los resultados

searchButton.onclick = () => {
    const type = searchType.value;

    // Buscar por texto
    if (type === "query") {
        const query = searchInput.value.trim();

        if (!query) {
            searchStatusEl.textContent = "Estado: escribe algo para buscar";
            return;
        }

        performSearch(() => searchPosts(query));
    }

    // Buscar por usuario
    else if (type === "user") {
        const userId = searchInput.value.trim();

        if (!userId) {
            searchStatusEl.textContent = "Estado: ingresa un ID de usuario";
            return;
        }

        performSearch(() => getPostsByUser(userId));
    }

    // Buscar por tag
    else if (type === "tag") {
        const tag = tagSelect.value;

        if (!tag) {
            searchStatusEl.textContent = "Estado: selecciona un tag";
            return;
        }

        performSearch(() => getPostsByTag(tag));
    }
};

// Esta es una función extra para que al presionar Enter en el input de búsqueda, se ejecute la búsqueda :S
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchButton.click();
});

//Para que se limpie el input y se vuelva al modo normal como estaban los posts 
clearBtn.onclick = () => {
    hideSearchMode();

    // Notificar a main.js que vuelva a cargar posts normales
    document.dispatchEvent(new CustomEvent("search:cleared"));
};