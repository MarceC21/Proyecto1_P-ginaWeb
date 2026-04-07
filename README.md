# Proyecto1 Página Web

Esta es una aplicación web dinámica que simula un blog, desarrollada utilizando únicamente HTML, CSS y JavaScript. Permite visualizar publicaciones, ver su detalle, realizar búsquedas, aplicar filtros y gestionar contenido desde la interfaz.

---

## Tecnologías utilizadas

- HTML
- CSS
- JavaScript 
- Consumo de APIs (DummyJSON / JSONPlaceholder)

---

## Estructura del proyecto
.
├── css/
│ └── main.css
│
├── js/
│ ├── api/
│ │ └── api.js
│ │
│ ├── compartido/
│ │ ├── states.js
│ │ ├── ui.js
│ │ └── validaciones.js
│ │
│ ├── detalle/
│ │ ├── detalle.js
│ │ └── detalleUI.js
│ │
│ ├── favoritos/
│ │ └── favoritos.js
│ │
│ ├── form/
│ │ ├── form.js
│ │ └── formUI.js
│ │
│ ├── posts/
│ │ ├── posts.js
│ │ └── postsUI.js
│ │
│ ├── search/
│ │ ├── search.js
│ │ └── searchUI.js
│ │
│ └── main.js
│
├── pages/
│ ├── favoritos.html
│ ├── vistaDetalle.html
│ └── vistaPost.html
│
├── index.html
└── README.md


---

## Funcionalidades principales

### Listado de publicaciones
- Obtiene publicaciones desde una API
- Muestra:
  - Título
  - Resumen
  - Autor
  - Botón "ver más"
- Implementa paginación

### Vista de detalle
- Muestra información completa de una publicación
- Navegación desde el listado principal

### Crear publicación
- Formulario con validaciones en JavaScript:
  - Campos obligatorios
  - Longitud mínima
  - Prevención de envío vacío
- Envío mediante solicitud POST

### Búsqueda y filtros
- Búsqueda por texto
- Filtros:
  - Usuario
  - Título o contenido
  - Tags

### Funcionalidad adicional
- Sección de favoritos

### Estados de la aplicación
- Indicador de carga
- Manejo de errores
- Mensajes de éxito

### Navegación
- Página principal (index)
- Vista de detalle
- Formulario de creación
- Sección de favoritos

---

## Consumo de API

El proyecto utiliza una API externa para:

- Obtener publicaciones (GET)
- Obtener detalle de publicación (GET)
- Crear publicación (POST)

---

## Arquitectura del proyecto

El proyecto sigue una estructura modular basada en separación de responsabilidades:

- `api/` → Manejo de llamadas a la API  
- `compartido/` → Lógica reutilizable (estado, UI, validaciones)  
- `posts/` → Listado de publicaciones  
- `detalle/` → Vista individual  
- `form/` → Creación de publicaciones  
- `search/` → Búsqueda y filtros  
- `favoritos/` → Funcionalidad adicional  

Esto permite:
- Mayor mantenibilidad
- Código reutilizable
- Mejor organización

---

## Cómo ejecutar el proyecto

1. Clonar el repositorio:

```bash
git clone <repo-url>
```

2.Abrir el proyecto:
Abrir index.html en el navegador o Usar Live Server (recomendado)

## Equipo
- Marcela Castillo
- Daniel Sandoval 

## Notas adicionales
Algunas acciones pueden ser simuladas si la API no soporta persistencia completa

