//Aqui estaran los estados globales (ui states) 

// Estos estados se usan para dar feedback visual al usuario

// Se utiliza una clase base "state" en todos los estados, y clases específicas para diferenciar cada tipo 
// ( Para reutilizar estilos)



// Estado inicial (idle)
// Se muestra cuando aún no hay interacción o datos cargados
export function renderIdle(container) {
    container.innerHTML = `
        <li class="state state-idle">
            <p>Los posts aparecerán aquí</p>
        </li>
    `;
}


// Estado de carga (loading)
// Indica que la aplicación está procesando datos
export function renderLoading(container) {
    container.innerHTML = `
        <li class="state state-loading">
            <p>Cargando...</p>
        </li>
    `;
}


// Estado de éxito (success)
// Se utiliza cuando los datos se cargaron correctamente
// (posts, resultados, etc.)
export function renderSuccess(container, html) {
    container.innerHTML = html;
}


// Estado vacío (empty)
// Se muestra cuando la búsqueda o consulta no devuelve resultados
export function renderEmpty(container) {
    container.innerHTML = `
        <li class="state state-empty">
            <p>No se encontraron resultados</p>
        </li>
    `;
}


// Estado de error (error)
// Se muestra cuando ocurre un fallo en la API o en la carga
// Incluye botón de reintento (retry)
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


// Estado de éxito para acciones (crear, editar, eliminar)
// Diferente al success general porque muestra un mensaje al usuario
export function renderSuccessMessage(container, message) {
    container.innerHTML = `
        <li class="state state-success">
            <p>${message}</p>
        </li>
    `;
}