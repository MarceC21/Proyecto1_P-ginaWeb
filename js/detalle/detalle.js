// Toda la lógica relacionada a los detalles de los posts
import { renderPostDetail } from "./detalleUI.js";

const detailContainer = document.getElementById("detailContainer");
const detailState = document.getElementById("detailState");

function initDetailPage() {
  detailState.textContent = "Vista de detalle lista para conectar con la API.";
  detailContainer.innerHTML = renderPostDetail({
    id: "-",
    title: "Aquí se mostrará el título del post",
    userId: "-",
    body: "Aquí se mostrará el contenido completo del post."
  });
}

initDetailPage();