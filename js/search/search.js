// Toda la lógica para manejar la búsqueda de los posts
import { searchPosts, getPostsByUser, getPostsByTag } from "../api/api.js";
import { renderLoading, renderError } from "../compartido/states.js";
import { renderSearchResults } from "./searchUI.js";

// Referencias al DOM
const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchStatusEl = document.getElementById("searchStatus");

// Estado de búsqueda 
let searchState = {
    type: "query", // este puede ser "query", "user" o "tag"
    value: ""
};

// Función principal de búsqueda
async function performSearch() {

    renderLoading(postsContainer);
    searchStatusEl.textContent = "Estado: buscando...";

    try {
        let data;

        // Decidir qué API usar según el tipo de búsqueda
        if (searchState.type === "query") {
            data = await searchPosts(searchState.value);
        } 
        else if (searchState.type === "user") {
            data = await getPostsByUser(searchState.value);
        } 
        else if (searchState.type === "tag") {
            data = await getPostsByTag(searchState.value);
        }

        const results = data.posts;

        renderSearchResults(postsContainer, results);

        // Actualizar estado
        searchStatusEl.textContent =
            results.length === 0
                ? "Estado: sin resultados"
                : `Estado: ${results.length} resultado(s) encontrado(s)`;

    } catch (error) {
        console.error("Error en búsqueda:", error);
        searchStatusEl.textContent = "Estado: error al buscar";
        renderError(postsContainer, performSearch);
    }
}

// Búsqueda por texto
searchButton.onclick = () => {
    const query = searchInput.value.trim();

    if (query === "") {
        searchStatusEl.textContent = "Estado: escribe algo para buscar";
        return;
    }

    searchState = {
        type: "query",
        value: query
    };

    performSearch();
};


//Filtro por usuario
document.getElementById("filterUser").onclick = () => {
    const userId = prompt("Ingrese el ID del usuario:");

    if (!userId) return;

    searchState = {
        type: "user",
        value: userId
    };

    performSearch();
};

// Filtro por tag
document.getElementById("filterTag").onclick = () => {
    const tag = prompt("Ingrese el tag:");

    if (!tag) return;

    searchState = {
        type: "tag",
        value: tag
    };

    performSearch();
};


// Esta es una función extra que permite la búsqueda al presionar Enter :S
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchButton.click();
});