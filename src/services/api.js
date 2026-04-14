import axios from 'axios';

// En desarrollo usa localhost, en producción usa la URL de Railway
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Envía el PDF al backend para análisis con IA
 * @param {File} file - Archivo PDF seleccionado por el usuario
 * @returns {object} - Respuesta con el análisis del CV
 */
export const reviewResume = async (file) => {
  // FormData es como un formulario HTML que envía archivos
  // Es la forma estándar de enviar archivos por HTTP (similar a como Postman lo hace)
  const formData = new FormData();
  formData.append('resume', file);

  const response = await axios.post(`${API_URL}/api/review`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};