import { API_URL } from '$lib/constantes/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		let url = new URL(`${API_URL}/equipos/${params.id}`);
		const response = await fetch(url);
		
		if (!response.ok) {
			if (response.status === 404) {
				error(404, {
					message: `No se encontró el equipo con ID ${params.id}`,
					title: "Equipo no encontrado",
					icon: "👥",
					suggestions: [
						"Verifica que el ID del equipo sea correcto",
						"El equipo podría haber sido eliminado",
						"Prueba creando un nuevo equipo"
					],
					backUrl: "/equipos",
					backText: "Ver todos los equipos"
				});
			}
			error(response.status, {
				message: "Hubo un problema al cargar la información del equipo",
				title: "Error del servidor",
				icon: "⚠️"
			});
		}

		let equipo = await response.json();

		// Validar que tenga datos mínimos
		if (!equipo || !equipo.nombre) {
			error(500, {
				message: "Los datos del equipo están incompletos",
				title: "Error en los datos",
				icon: "🔧"
			});
		}

		const pokemonsRes = await fetch(`${API_URL}/pokemon/?limit=100&offset=0`);
		if (!pokemonsRes.ok) throw error(pokemonsRes.status);
		const pokemonsDisponibles = await pokemonsRes.json();
		
		const movimientosRes = await fetch(`${API_URL}/movimientos`);
		if (!movimientosRes.ok) throw error(movimientosRes.status);
		const movimientos = await movimientosRes.json();

		return {
			equipo,
			pokemonsDisponibles,
			movimientos
		};
	} catch (err) {
		if (err.status) {
			throw err;
		}
		
		error(503, {
			message: "No se pudo conectar con el servidor. Inténtalo más tarde.",
			title: "Error de conexión",
			icon: "🌐",
			suggestions: [
				"Verifica tu conexión a internet",
				"El servidor podría estar temporalmente no disponible"
			]
		});
	}
}

export const actions = {
	eliminar_integrante: async ({ request }) => {		const data = await request.formData();
		//console.log(data.get('id_equipo'))
		//console.log(data.get('integrante_id'))
		let url = new URL(
			`${API_URL}/equipos/${data.get('id_equipo')}/integrantes/${data.get('integrante_id')}`
		);

		const response = await fetch(url, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});
		if (!response.ok) {
			error(response.status, 'No se pudo eliminar al integrante');
		}
	},
	actualizar_equipo: async ({ request }) => {
		const data = await request.formData();		let url = new URL(`${API_URL}/equipos/${data.get('id_equipo')}`);
		const nombre = data.get('nombre');
		const id_generacion = parseInt(data.get('id_generacion'));

		const payload = { nombre, id_generacion };
		const response = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
		if (!response.ok) {
			const msg = await response.text();
			throw error(response.status, msg || 'Error al actualizar el equipo');
		}
	},
	agregar_integrante: async ({ request }) => {
		const data = await request.formData();
		const id_equipo = data.get('id_equipo');
		const payload = {
			apodo: data.get('apodo'),
			id_pokemon: parseInt(data.get('id_pokemon'))
		};
		const url = `${API_URL}/equipos/${id_equipo}/integrantes`;
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});
		if (!response.ok) {
			const msg = await response.text();
			throw error(response.status, msg || 'Error al agregar el integrante');
		}
	}, agregar_movimiento: async ({ request }) => {
		const data = await request.formData();
		const id_equipo = data.get('id_equipo');
		const id_integrante = data.get('id_integrante');
		const id_movimiento = parseInt(data.get('id_movimiento'));

		const payload = {
			id_movimiento: id_movimiento
		};

		const url = `${API_URL}/equipos/${id_equipo}/integrantes/${id_integrante}/movimientos`;
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const msg = await response.text();
			throw error(response.status, msg || 'Error al agregar el movimiento');
		}
	}, editar_integrante: async ({ request }) => {
		const data = await request.formData();
		const id_equipo = data.get('id_equipo');
		const id_integrante = data.get('id_integrante');
		const apodo = data.get('apodo');

		// Obtener el equipo completo para acceder a los datos del integrante
		const equipoUrl = `${API_URL}/equipos/${id_equipo}`;
		const equipoResponse = await fetch(equipoUrl);
		if (!equipoResponse.ok) {
			throw error(equipoResponse.status, 'Error al obtener el equipo');
		}
		const equipo = await equipoResponse.json();

		// Buscar el integrante específico
		const integrante = equipo.integrantes.find(i => i.id == id_integrante);
		if (!integrante) {
			throw error(404, 'Integrante no encontrado');
		}

		const payload = {
			apodo: apodo || "Sin-Nombre",
			movimientos: integrante.movimientos?.map(m => m.id) || []
		};

		const url = `${API_URL}/equipos/${id_equipo}/integrantes/${id_integrante}`;
		const response = await fetch(url, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});

		if (!response.ok) {
			const msg = await response.text();
			throw error(response.status, msg || 'Error al editar el integrante');
		}
	}
};
