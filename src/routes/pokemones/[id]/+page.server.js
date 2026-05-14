import { API_URL } from '$lib/constantes/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const apiUrl = new URL(`${API_URL}/pokemon/${params.id}`);
		const response = await fetch(apiUrl);

		if (!response.ok) {
			if (response.status === 404) {
				error(404, {
					message: `No se encontró el Pokemon con ID ${params.id}`,
					title: "Pokemon no encontrado",
					suggestions: [
						"Verifica que el ID del Pokemon sea correcto",
						"Los IDs válidos van del 1 al 1010",
						"Prueba buscando por nombre en la lista de Pokemones"
					]
				});
			}
			error(response.status, {
				message: "Hubo un problema al cargar la información del Pokemon",
				title: "Error del servidor"
			});
		}

		const pokemon = await response.json();

		// Validar que tenga datos mínimos
		if (!pokemon || !pokemon.nombre) {
			error(500, {
				message: "Los datos del Pokemon están incompletos",
				title: "Error en los datos"
			});
		}

		return {
			pokemon
		};
	} catch (err) {
		if (err.status) {
			// Re-lanzar errores de SvelteKit
			throw err;
		}
		
		// Error de red u otros errores
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
