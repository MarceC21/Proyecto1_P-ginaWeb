//Todo lo del render de los posts. Lo de pintar las cards y paginación
// postsUI.js

import { PostCard } from "../compartido/ui.js";
import { renderEmpty, renderSuccess } from "../compartido/states.js";

export function renderPosts(container, posts) {

    if (!posts || posts.length === 0) {
        renderEmpty(container);
        return;
    }

    const postsHTML = posts.map(post => PostCard(post)).join("");

    renderSuccess(container, postsHTML);
}
