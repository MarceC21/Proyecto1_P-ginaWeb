//Aqui estaran los estados globales (ui states) 

// Estos estados se usan para dar feedback visual al usuario

// Se utiliza una clase base "state" en todos los estados, y clases específicas para diferenciar cada tipo 
// ( Para reutilizar estilos)

// states.js

// Estado inicial (idle)
export function renderIdle(container) {
    container.innerHTML = `
        <li class="state state-idle">
            <p>Los posts aparecerán aquí</p>
        </li>
    `;
}

// Estado de carga (loading)
export function renderLoading(container) {
    container.innerHTML = `
        <li class="state state-loading">
            <p>Cargando...</p>
        </li>
    `;
}

// Estado de éxito (success)
export function renderSuccess(container, postsHTML) {
    container.innerHTML = postsHTML;
}

// Estado vacío (empty)
export function renderEmpty(container) {
    container.innerHTML = `
        <li class="state state-empty">
            <p>No se encontraron resultados</p>
        </li>
    `;
}

// Estado de error (error)
export function renderError(container, retryCallback) {
    container.innerHTML = `
        <li class="state state-error">
            <p>Ocurrió un error.</p>
            <button id="retryBtn">Reintentar</button>
        </li>
    `;

    const btn = container.querySelector("#retryBtn");
    if (btn && retryCallback) {
        btn.addEventListener("click", retryCallback);
    }
}

// Estado de éxito para acciones
export function renderSuccessMessage(container, message) {
    container.innerHTML = `
        <li class="state state-success">
            <p>${message}</p>
        </li>
    `;
}