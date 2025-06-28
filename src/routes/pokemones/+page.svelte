<script>
	import { page } from '$app/stores';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import TarjetaPokemon from '$lib/components/TarjetaPokemon.svelte';
	import { NOMBRES_TIPOS } from '$lib/constantes';
	import { showLoading } from '$lib/stores/loading.js';
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
	
	const buscarPokemon = (e) => {
		showLoading('Buscando Pokémon...');
		// El formulario se enviará normalmente después de mostrar el loading
		// El loading se ocultará cuando la página se recargue
	};
</script>

<svelte:head>
	<title>Pokémon - PokéAPI</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-lg py-8">
	<main class="flex-1">
		<div class="max-w-7xl mx-auto px-4">
			<a href="../" class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors mb-8 shadow">◄ Menu Principal</a>
			<!-- Encabezado de la página -->
			<div class="text-center mb-8">
				<h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 drop-shadow-lg">Explorar Pokémon</h1>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Descubre todos los Pokémon disponibles. Usa los filtros para encontrar exactamente lo que buscas.
				</p>
			</div>
			<!-- Sección de filtros -->
			<div class="bg-white/90 rounded-2xl shadow-lg border border-slate-200 p-8 mb-10">
				<div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
					<h2 class="text-2xl font-bold text-blue-700">Filtros</h2>
					<div class="flex gap-2">
						<button
							class="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-pink-500 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-md"
							form="form-filtrar-pokemon"
							type="submit">Buscar</button>
						<button
							class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors text-sm cursor-pointer"
							onclick={limpiarFiltros}
						>
							Limpiar filtros
						</button>
					</div>
				</div>
				<form action="?/filter" id="form-filtrar-pokemon" onsubmit={buscarPokemon}>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
						<div class="flex flex-col gap-2">
							<label for="nombre" class="text-sm font-medium text-slate-700">Buscar por nombre</label>
							<input
								id="search"
								name="nombre"
								bind:value={terminoBusqueda}
								type="text"
								placeholder="Ej: Pikachu, Charizard..."
								class="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm bg-slate-50"
							/>
						</div>
						<div class="flex flex-col gap-2">
							<label for="tipo" class="text-sm font-medium text-slate-700">Filtrar por tipo</label>
							<select
								id="type"
								name="tipo"
								bind:value={tipoSeleccionado}
								class="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm bg-slate-50"
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
							<span class="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md text-sm border border-slate-200">
								Búsqueda: "{terminoBusqueda}"
								<button
									onclick={() => (terminoBusqueda = '')}
									class="text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
								>×</button>
							</span>
						{/if}
						{#if tipoSeleccionado}
							<span class="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md text-sm border border-slate-200">
								<EtiquetaTipo tipo={tipoSeleccionado} tamaño="sm" />
								<button
									onclick={() => (tipoSeleccionado = '')}
									class="text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
								>×</button>
							</span>
						{/if}
					</div>
				{/if}
			</div>
			<!-- Sección de resultados -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-6 flex-col md:flex-row gap-4">
					<span class="text-xl font-semibold text-slate-800">Resultados ({data.pokemones.length})</span>
					<Pagination currentPage={data.currentPage} hasMore={data.hasMore} pageSize={data.pageSize} />
				</div>
				{#if data.pokemones.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
						{#each data.pokemones as pokemon}
							<TarjetaPokemon {pokemon} />
						{/each}
					</div>
				{:else}
					<EmptyState 
						type="pokémon"
						searchTerm={terminoBusqueda || ($page.url.searchParams.get('nombre') || '')}
						hasFilters={!!tipoSeleccionado || !!terminoBusqueda}
						icon="🐾"
					/>
				{/if}
			</div>
		</div>
	</main>
</div>
