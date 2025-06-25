import { writable } from 'svelte/store';

// Store para controlar el estado de loading
export const isLoading = writable(false);
export const loadingMessage = writable('Cargando...');

// Función para mostrar loading
export function showLoading(mensaje = 'Cargando...') {
	console.log('Mostrando loading:', mensaje); // Debug
	loadingMessage.set(mensaje);
	isLoading.set(true);
}

// Función para ocultar loading
export function hideLoading() {
	console.log('Ocultando loading'); // Debug
	isLoading.set(false);
}

// Función para hacer fetch con loading automático
export async function fetchWithLoading(url, options = {}, mensaje = 'Cargando datos...') {
	showLoading(mensaje);
	try {
		const response = await fetch(url, options);
		return response;
	} finally {
		hideLoading();
	}
}
