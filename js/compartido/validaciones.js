// Aqui están todas las validaciones para crear un nuevo post
export function validarPost(data) {
  const errors = [];

  if (!data.title || data.title.trim() === "") {
    errors.push("El título es obligatorio.");
  } else if (data.title.trim().length < 5) {
    errors.push("El título debe tener al menos 5 caracteres.");
  }

  if (!data.body || data.body.trim() === "") {
    errors.push("El contenido es obligatorio.");
  } else if (data.body.trim().length < 10) {
    errors.push("El contenido debe tener al menos 10 caracteres.");
  }

  if (!data.userId || data.userId.trim() === "") {
    errors.push("El ID de usuario es obligatorio.");
  } else if (isNaN(Number(data.userId)) || Number(data.userId) <= 0) {
    errors.push("El ID de usuario debe ser un número mayor que 0.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}