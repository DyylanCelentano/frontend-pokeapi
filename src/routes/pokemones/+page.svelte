<script>
	import { page } from '$app/stores';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import TarjetaPokemon from '$lib/components/TarjetaPokemon.svelte';
	import { NOMBRES_TIPOS } from '$lib/constantes';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onMount } from 'svelte';

	let { data } = $props();
	let terminoBusqueda = $state('');
	let tipoSeleccionado = $state('');

	// Inicializar filtros desde la URL y ocultar loading
	onMount(() => {
		terminoBusqueda = $page.url.searchParams.get('nombre') || '';
		tipoSeleccionado = $page.url.searchParams.get('tipo') || '';
		hideLoading();
	});

	// Ocultar loading cuando los datos cambian (reactivo)
	$effect(() => {
		if (data.pokemones) {
			hideLoading();
		}
	});

	// Timeout de seguridad para ocultar loading si tarda mucho
	let loadingTimeout;

	const limpiarFiltros = (e) => {
		const formElement = document.getElementById('form-filtrar-pokemon');
		formElement.reset();
		location.href = 'pokemones?page=0';
	};
	
	const buscarPokemon = (e) => {
		showLoading('Buscando Pokemon...');
		
		// Timeout de seguridad: ocultar loading después de 10 segundos máximo
		clearTimeout(loadingTimeout);
		loadingTimeout = setTimeout(() => {
			hideLoading();
		}, 10000);
		
		// El formulario se enviará normalmente después de mostrar el loading
		// El loading se ocultará automáticamente cuando los datos cambien
	};
</script>

<svelte:head>
	<title>IntroDex | Pokemon</title>
</svelte:head>

<div class="page-shell">
	<main class="app-main">
		<section class="ui-section">
			<div class="ui-container">
				<a href="../" class="back-link">Volver al inicio</a>
				<div class="page-header">
					<div>
						<p class="ui-kicker">IntroDex</p>
						<h1>Pokemones</h1>
					</div>
				</div>

				<div class="filter-panel ui-surface">
					<div class="filter-header">
						<div>
							<h2>Filtros</h2>
						</div>
						<div class="filter-actions">
							<button
								class="ui-button primary"
								form="form-filtrar-pokemon"
								type="submit"
							>
								Buscar
							</button>
							<button class="ui-button ghost" onclick={limpiarFiltros}>
								Limpiar filtros
							</button>
						</div>
					</div>
					<form action="?/filter" id="form-filtrar-pokemon" onsubmit={buscarPokemon}>
						<div class="filter-grid">
							<div>
								<label for="nombre">Buscar por nombre</label>
								<input
									id="nombre"
									name="nombre"
									bind:value={terminoBusqueda}
									type="text"
									placeholder="Ej: Pikachu, Charizard..."
									class="ui-input"
								/>
							</div>
							<div>
								<label for="tipo">Filtrar por tipo</label>
								<select
									id="tipo"
									name="tipo"
									bind:value={tipoSeleccionado}
									class="ui-select"
								>
									<option value="">Todos los tipos</option>
									{#each NOMBRES_TIPOS as tipo}
										<option value={tipo.toLowerCase()}>{tipo}</option>
									{/each}
								</select>
							</div>
						</div>
					</form>
					{#if terminoBusqueda || tipoSeleccionado}
						<div class="filter-chips">
							<span class="ui-pill">Filtros activos</span>
							{#if terminoBusqueda}
								<span class="ui-chip">
									Busqueda: "{terminoBusqueda}"
									<button onclick={() => (terminoBusqueda = '')} class="chip-button">×</button>
								</span>
							{/if}
							{#if tipoSeleccionado}
								<span class="ui-chip">
									<EtiquetaTipo tipo={tipoSeleccionado} tamaño="sm" />
									<button onclick={() => (tipoSeleccionado = '')} class="chip-button">×</button>
								</span>
							{/if}
						</div>
					{/if}
				</div>

				<div class="results-header">
					<span class="results-count">Resultados ({data.pokemones.length})</span>
					<Pagination currentPage={data.currentPage} hasMore={data.hasMore} pageSize={data.pageSize} />
				</div>

				{#if data.pokemones.length > 0}
					<div class="ui-grid ui-grid-4">
						{#each data.pokemones as pokemon}
							<TarjetaPokemon {pokemon} />
						{/each}
					</div>
				{:else}
					<EmptyState
						type="pokemon"
						searchTerm={terminoBusqueda || ($page.url.searchParams.get('nombre') || '')}
						hasFilters={!!tipoSeleccionado || !!terminoBusqueda}
					/>
				{/if}
			</div>
		</section>
	</main>
</div>
