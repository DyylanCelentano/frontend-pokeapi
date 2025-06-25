import { API_URL } from '$lib/constantes/index.js';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const tipos = {
        "normal": 1,
        "lucha": 2,
        "volador": 3,
        "veneno": 4,
        "tierra": 5,
        "roca": 6,
        "insecto": 7,
        "fantasma": 8,
        "acero": 9,
        "fuego": 10,
        "agua": 11,
        "planta": 12,
        "electrico": 13,
        "psiquico": 14,
        "hielo": 15,
        "dragon": 16,
        "siniestro": 17,
        "hada": 18,
        "oscuro": 10002,
    }
    const query = url.searchParams.get('nombre_parcial') || '';
    const query2 = url.searchParams.get('tipo') || '';
    const page = parseInt(url.searchParams.get('page') || '0');
    const pageSize = 20;
    const offset = page * pageSize;

    let apiUrl = new URL(`${API_URL}/movimientos`)
    apiUrl.searchParams.set('limit', pageSize.toString());
    apiUrl.searchParams.set('offset', offset.toString());
    if (query) {
        apiUrl.searchParams.set('nombre_parcial', query);
    }
    const query_tipos = query2.toLowerCase();
    if (query_tipos && tipos[query_tipos]) {
        let query_tipos_buscar = tipos[query_tipos];
        apiUrl.searchParams.set('tipo', query_tipos_buscar);
    }
    const response = await fetch(apiUrl);
    if (!response.ok) {
        error(`Response status: ${response.status}`);
    }
    const movimientos = await response.json();

    const hasMore = movimientos.length === pageSize;
    return {
        movimientos: movimientos,
        currentPage: page,
        pageSize: pageSize,
        hasMore: hasMore,
        query,
        query2
    };
}
