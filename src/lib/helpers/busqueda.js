import { goto } from '$app/navigation';

// Función para buscar pokémones y navegar con los resultados
export function buscarPokemon(nombre) {
    if (!nombre || nombre.trim() === '') return;
    
    const nombreLimpio = nombre.trim();
    const urlBusqueda = `/pokemones?nombre=${encodeURIComponent(nombreLimpio)}`;
    goto(urlBusqueda);
}

// Función para limpiar búsqueda
export function limpiarBusqueda() {
    goto('/pokemones');
}
