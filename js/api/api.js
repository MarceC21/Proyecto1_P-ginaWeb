// Aqui solo se hace fetch a la API

// Lógica de la API para consumir los endpoints de posts
// Documentación: https://dummyjson.com/docs/posts


const BASE_URL = "https://dummyjson.com/posts";



// GET - OBTENER POSTS --------------------------------------------------------------------------------

// Obtener todos los posts
export async function getPosts() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("Error al obtener los posts");
    }

    return response.json();
}


// Obtener un post por ID (DETALLE)
export async function getPostById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el post");
    }

    return response.json();
}


// PAGINACIÓN ------------------------------------------------------------------------------------------

// Obtener posts con paginación (skip + limit)
export async function getPostsRange(skip = 0, limit = 10) {
    const response = await fetch(`${BASE_URL}?skip=${skip}&limit=${limit}`);

    if (!response.ok) {
        throw new Error("Error al obtener los posts");
    }

    return response.json();
}


// BÚSQUEDA Y FILTROS -------------------------------------------------------------------------------------

// Buscar posts por texto (title o body)
export async function searchPosts(query) {
    const response = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
        throw new Error("Error al buscar posts");
    }

    return response.json();
}


// Obtener posts por usuario (filtro por userId)
export async function getPostsByUser(userId) {
    const response = await fetch(`${BASE_URL}/user/${userId}`);

    if (!response.ok) {
        throw new Error("Error al obtener posts por usuario");
    }

    return response.json();
}


// Obtener lista de tags disponibles (para ver los tgags que se pueden usar para filtrar)
export async function getPostsTagList() {
    const response = await fetch(`${BASE_URL}/tag-list`);

    if (!response.ok) {
        throw new Error("Error al obtener la lista de tags");
    }

    return response.json();
}


// Obtener posts por tag
export async function getPostsByTag(tag) {
    const response = await fetch(`${BASE_URL}/tag/${tag}`);

    if (!response.ok) {
        throw new Error("Error al obtener posts por tag");
    }

    return response.json();
}


// CREAR, EDITAR, ELIMINAR POSTS -------------------------------------------------------------------------

// Crear un nuevo post 
export async function createPost(postData) {
    const response = await fetch(`${BASE_URL}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error("Error al crear el post");
    }

    return response.json();
}


// Editar un post
export async function updatePost(postId, data) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: 'PUT', // también se puede usar PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el post");
    }

    return response.json();
}


// Eliminar un post
export async function deletePost(postId) {
    const response = await fetch(`${BASE_URL}/${postId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el post");
    }

    return response.json();
}