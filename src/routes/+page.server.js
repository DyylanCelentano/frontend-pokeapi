import { API_URL, TIPOS } from '$lib/constantes/index';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
	const apiUrl = new URL(`${API_URL}/pokemon/`);
	const queryNombreParcial = url.searchParams.get('nombre') || '';
	const queryTipo = url.searchParams.get('tipo') || '';
	const queryPage = parseInt(url.searchParams.get('page') || '0');
	const pageSize = 4;
	const offset = pageSize * queryPage;

	apiUrl.searchParams.set('limit', pageSize);
	apiUrl.searchParams.set('offset', offset);

	if (queryNombreParcial) apiUrl.searchParams.set('nombre_parcial', queryNombreParcial);
	if (queryTipo) apiUrl.searchParams.set('tipo', TIPOS[queryTipo]);

	const response = await fetch(apiUrl);

	if (!response.ok) {
		error(`Error ${response.status}, ${response.statusText}`);
	}

	const pokemones = await response.json();

	return { pokemones };
}
