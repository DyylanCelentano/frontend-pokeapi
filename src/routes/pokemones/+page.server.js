import { API_URL, TIPOS } from '$lib/constantes/index';
import { error, redirect } from '@sveltejs/kit';

export async function load({ url }) {
	const apiUrl = new URL(`${API_URL}/pokemon`);
	const queryNombreParcial = url.searchParams.get('nombre') || '';
	const queryTipo = url.searchParams.get('tipo') || '';
	const queryPage = parseInt(url.searchParams.get('page') || '0');
	const pageSize = 20;
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
	const hasMore = pokemones.length == pageSize;

	return { pokemones, pageSize, hasMore, currentPage: queryPage };
}

export const actions = {
	filter: async ({ request, url }) => {
		const data = await request.formData();
		const nombre = data.get('nombre') || '';
		const tipo = data.get('tipo') || '';
		
		let redirectUrl = new URL('/pokemones', url.origin);
		
		if (nombre) redirectUrl.searchParams.set('nombre', nombre);
		if (tipo) redirectUrl.searchParams.set('tipo', tipo);
		
		throw redirect(302, redirectUrl.toString());
	}
};
