const favoritesMessage = document.getElementById("favoritesMessage");
const favoritesContainer = document.getElementById("favoritesContainer");
const clearFavoritesButton = document.getElementById("clearFavoritesButton");

function getFavorites() {
  const storedFavorites = localStorage.getItem("favoritePosts");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function saveDemoFavorites() {
  const currentFavorites = getFavorites();

  if (currentFavorites.length === 0) {
    const demoFavorites = [
      {
        id: 1,
        title: "Post favorito de ejemplo",
        body: "Este es un post guardado de ejemplo para probar la sección adicional."
      },
      {
        id: 2,
        title: "Otro favorito de ejemplo",
        body: "Aquí se mostrará información de publicaciones guardadas por el usuario."
      }
    ];

    localStorage.setItem("favoritePosts", JSON.stringify(demoFavorites));
  }
}

function clearFavorites() {
  localStorage.removeItem("favoritePosts");
}

function renderFavorites(favorites) {
  favoritesContainer.innerHTML = favorites
    .map(
      (post) => `
        <li>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </li>
      `
    )
    .join("");
}

function updateFavoritesView() {
  const favorites = getFavorites();

  if (favorites.length === 0) {
    favoritesMessage.textContent = "No hay publicaciones favoritas guardadas.";
    favoritesContainer.innerHTML = "";
    return;
  }

  favoritesMessage.textContent = "Estas son tus publicaciones favoritas guardadas.";
  renderFavorites(favorites);
}

function initFavoritesPage() {
  saveDemoFavorites();
  updateFavoritesView();

  clearFavoritesButton.addEventListener("click", () => {
    clearFavorites();
    updateFavoritesView();
  });
}

initFavoritesPage();