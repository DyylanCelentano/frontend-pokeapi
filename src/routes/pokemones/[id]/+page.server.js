import { API_URL } from '$lib/constantes/index.js';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const apiUrl = new URL(`${API_URL}/pokemon/${params.id}`);
	const response = await fetch(apiUrl);

	if (!response.ok) {
		error(`Error ${response.status}, ${response.statusText}`);
	}

	const pokemon = await response.json();

	return {
		pokemon
	};
}
