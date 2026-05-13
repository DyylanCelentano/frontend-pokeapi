import { API_URL } from '$lib/constantes/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        let url = new URL(`${API_URL}/movimientos/${params.id}`)
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                error(404, {
                    message: `No se encontró el movimiento con ID ${params.id}`,
                    title: "Movimiento no encontrado",
                    suggestions: [
                        "Verifica que el ID del movimiento sea correcto",
                        "Prueba buscando por nombre en la lista de movimientos",
                        "Algunos movimientos podrían no estar disponibles"
                    ],
                    backUrl: "/movimientos",
                    backText: "Ver todos los movimientos"
                });
            }
            error(response.status, {
                message: "Hubo un problema al cargar la información del movimiento",
                title: "Error del servidor"
            });
        }

        let movimiento = await response.json();

        // Validar que tenga datos mínimos
        if (!movimiento || !movimiento.nombre) {
            error(500, {
                message: "Los datos del movimiento están incompletos",
                title: "Error en los datos"
            });
        }

        return {
            movimiento
        };
    } catch (err) {
        if (err.status) {
            throw err;
        }
        
        error(503, {
            message: "No se pudo conectar con el servidor. Inténtalo más tarde.",
            title: "Error de conexión",
            suggestions: [
                "Verifica tu conexión a internet",
                "El servidor podría estar temporalmente no disponible"
            ]
        });
    }
}


