<script>
	import { page } from '$app/stores';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import TarjetaPokemon from '$lib/components/TarjetaPokemon.svelte';
	import { NOMBRES_TIPOS } from '$lib/constantes';
	import { onMount } from 'svelte';
	import './page.css';

	let { data } = $props();
	let terminoBusqueda = $state('');
	let tipoSeleccionado = $state('');

	// Inicializar filtros desde la URL
	onMount(() => {
		terminoBusqueda = $page.url.searchParams.get('nombre') || '';
		tipoSeleccionado = $page.url.searchParams.get('tipo') || '';
	});

	const limpiarFiltros = (e) => {
		const formElement = document.getElementById('form-filtrar-pokemon');
		formElement.reset();
		location.href = 'pokemones?page=0';
	};
</script>

<div class="min-h-screen bg-slate-50">
	<div class="max-w-7xl mx-auto px-4 py-8">
		<!-- Encabezado de la página -->
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-slate-800 mb-4">Explorar Pokémon</h1>
			<p class="text-lg text-slate-600 max-w-2xl mx-auto">
				Descubre todos los Pokémon disponibles. Usa los filtros para encontrar exactamente lo que
				buscas.
			</p>
		</div>

		<!-- Sección de filtros -->
		<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-xl font-semibold text-slate-800">Filtros</h2>
				<div>
					<button
						class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors text-sm cursor-pointer"
						form="form-filtrar-pokemon"
						type="submit">Buscar</button
					>
					<button
						class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors text-sm cursor-pointer"
						onclick={limpiarFiltros}
					>
						Limpiar filtros
					</button>
				</div>
			</div>

			<form action="?/filter" id="form-filtrar-pokemon">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
					<div class="flex flex-col gap-2">
						<label for="nombre" class="text-sm font-medium text-slate-700">Buscar por nombre</label>
						<input
							id="search"
							name="nombre"
							bind:value={terminoBusqueda}
							type="text"
							placeholder="Ej: Pikachu, Charizard..."
							class="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
						/>
					</div>

					<div class="flex flex-col gap-2">
						<label for="tipo" class="text-sm font-medium text-slate-700">Filtrar por tipo</label>
						<select
							id="type"
							name="tipo"
							bind:value={tipoSeleccionado}
							class="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
						>
							<option value="">Todos los tipos</option>
							{#each NOMBRES_TIPOS as tipo}
								<option value={tipo.toLowerCase()}>{tipo}</option>
							{/each}
						</select>
					</div>
				</div>
			</form>

			<!-- Filtros activos -->
			{#if terminoBusqueda || tipoSeleccionado}
				<div class="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-200">
					<span class="text-sm font-medium text-slate-600">Filtros activos:</span>
					{#if terminoBusqueda}
						<span
							class="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md text-sm border border-slate-200"
						>
							Búsqueda: "{terminoBusqueda}"
							<button
								onclick={() => (terminoBusqueda = '')}
								class="text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
								>×</button
							>
						</span>
					{/if}
					{#if tipoSeleccionado}
						<span
							class="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md text-sm border border-slate-200"
						>
							<EtiquetaTipo tipo={tipoSeleccionado} tamaño="sm" />
							<button
								onclick={() => (tipoSeleccionado = '')}
								class="text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
								>×</button
							>
						</span>
					{/if}
				</div>
			{/if}
		</div>

		<!-- Sección de resultados -->
		<div class="mb-8">
			<div class="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
				<span class="text-xl font-semibold text-slate-800"
					>Resultados ({data.pokemones.length})</span
				>
				<Pagination
					currentPage={data.currentPage}
					hasMore={data.hasMore}
					pageSize={data.pageSize}
				/>
			</div>

			{#if data.pokemones.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
					{#each data.pokemones as pokemon}
						<TarjetaPokemon {pokemon} />
					{/each}
				</div>
			{:else}
				<div class="text-center py-12 bg-white rounded-lg border border-slate-200">
					<div class="text-6xl mb-4">🔍</div>
					<h3 class="text-xl font-semibold text-slate-800 mb-2">No se encontraron Pokémon</h3>
					<p class="text-slate-600 mb-6">
						Intenta ajustar tus filtros o buscar con otros términos.
					</p>
					<button
						class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
						onclick={limpiarFiltros}
					>
						Limpiar filtros
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
