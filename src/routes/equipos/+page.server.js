import { API_URL } from '$lib/constantes/index.js';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const query = url.searchParams.get('nombre_parcial') || '';
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = 20;
    const offset = page * pageSize;

    let apiUrl = new URL(`${API_URL}/equipos`)
    apiUrl.searchParams.set('limit', pageSize.toString());
    apiUrl.searchParams.set('offset', offset.toString());
    if (query) {
        apiUrl.searchParams.set('nombre_parcial', query);
    }
    const response = await fetch(apiUrl);
    if (!response.ok) {
        error(`Response status: ${response.status}`);
    }
    const equipos = await response.json();

    const hasMore = equipos.length === pageSize;
    return {
        equipos: equipos,
        currentPage: page,
        pageSize: pageSize,
        hasMore: hasMore,
        query
    };
}


export const actions = {
    create: async ({ request }) => {
        const data = await request.formData();

        const nombre = data.get('nombre');
        const id_generacion = parseInt(data.get('id_generacion'));

        const payload = { nombre, id_generacion };

        let url = new URL(`${API_URL}/equipos`)
        //console.log(payload);
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const msg = await response.text();
            throw error(response.status, msg || 'Error al actualizar el equipo');
        }

        return { success: true };
    },
    eliminar_equipo: async ({ request }) => {
        const data = await request.formData();
        //console.log(data.get('id_equipo'))
        //console.log(data.get('integrante_id'))
        let url = new URL(`${API_URL}/equipos/${data.get('id_equipo')}`)

        const response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            error(response.status, 'No se pudo eliminar a ese equipo');
        }
    }
}
