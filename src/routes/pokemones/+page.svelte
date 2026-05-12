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

	onMount(() => {
		terminoBusqueda = $page.url.searchParams.get('nombre') || '';
		tipoSeleccionado = $page.url.searchParams.get('tipo') || '';
		hideLoading();
	});

	$effect(() => {
		if (data.pokemones) {
			hideLoading();
		}
	});

	let loadingTimeout;

	const limpiarFiltros = (e) => {
		const formElement = document.getElementById('form-filtrar-pokemon');
		formElement.reset();
		location.href = 'pokemones?page=0';
	};
	
	const buscarPokemon = (e) => {
		showLoading('Buscando Pokemon...');
		clearTimeout(loadingTimeout);
		loadingTimeout = setTimeout(() => {
			hideLoading();
		}, 10000);
	};
</script>

<svelte:head>
	<title>Pokemon - IntroDex</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg-primary)] py-8">
	<main class="flex-1">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Back button -->
			<a href="/" class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 text-sm">
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15,18 9,12 15,6"/>
				</svg>
				Menu Principal
			</a>
			
			<!-- Page header -->
			<div class="mb-10">
				<h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">Explorar Pokemon</h1>
				<p class="text-[var(--color-text-secondary)] max-w-2xl">
					Descubre todos los Pokemon disponibles. Usa los filtros para encontrar exactamente lo que buscas.
				</p>
			</div>
			
			<!-- Filters section -->
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
				<div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
					<h2 class="text-lg font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
						<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
						</svg>
						Filtros
					</h2>
					<div class="flex gap-2">
						<button
							class="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-medium transition-colors text-sm"
							form="form-filtrar-pokemon"
							type="submit"
						>
							Buscar
						</button>
						<button
							class="px-4 py-2 bg-[var(--color-bg-hover)] hover:bg-[var(--color-border-focus)] text-[var(--color-text-secondary)] rounded-lg font-medium transition-colors text-sm"
							onclick={limpiarFiltros}
						>
							Limpiar
						</button>
					</div>
				</div>
				
				<form action="?/filter" id="form-filtrar-pokemon" onsubmit={buscarPokemon}>
					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div class="flex flex-col gap-2">
							<label for="nombre" class="text-sm font-medium text-[var(--color-text-secondary)]">Buscar por nombre</label>
							<div class="relative">
								<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<circle cx="11" cy="11" r="8"/>
									<line x1="21" y1="21" x2="16.65" y2="16.65"/>
								</svg>
								<input
									id="search"
									name="nombre"
									bind:value={terminoBusqueda}
									type="text"
									placeholder="Ej: Pikachu, Charizard..."
									class="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
								/>
							</div>
						</div>
						<div class="flex flex-col gap-2">
							<label for="tipo" class="text-sm font-medium text-[var(--color-text-secondary)]">Filtrar por tipo</label>
							<select
								id="type"
								name="tipo"
								bind:value={tipoSeleccionado}
								class="w-full px-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
							>
								<option value="">Todos los tipos</option>
								{#each NOMBRES_TIPOS as tipo}
									<option value={tipo.toLowerCase()}>{tipo}</option>
								{/each}
							</select>
						</div>
					</div>
				</form>
				
				<!-- Active filters -->
				{#if terminoBusqueda || tipoSeleccionado}
					<div class="flex items-center gap-2 flex-wrap pt-4 mt-4 border-t border-[var(--color-border)]">
						<span class="text-sm text-[var(--color-text-muted)]">Filtros activos:</span>
						{#if terminoBusqueda}
							<span class="inline-flex items-center gap-2 bg-[var(--color-bg-elevated)] px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-secondary)] border border-[var(--color-border)]">
								Busqueda: "{terminoBusqueda}"
								<button
									onclick={() => (terminoBusqueda = '')}
									class="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
								>
									<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<line x1="18" y1="6" x2="6" y2="18"/>
										<line x1="6" y1="6" x2="18" y2="18"/>
									</svg>
								</button>
							</span>
						{/if}
						{#if tipoSeleccionado}
							<span class="inline-flex items-center gap-2 bg-[var(--color-bg-elevated)] px-3 py-1.5 rounded-lg text-sm border border-[var(--color-border)]">
								<EtiquetaTipo tipo={tipoSeleccionado} tamaño="sm" />
								<button
									onclick={() => (tipoSeleccionado = '')}
									class="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
								>
									<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<line x1="18" y1="6" x2="6" y2="18"/>
										<line x1="6" y1="6" x2="18" y2="18"/>
									</svg>
								</button>
							</span>
						{/if}
					</div>
				{/if}
			</div>
			
			<!-- Results section -->
			<div>
				<div class="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
					<span class="text-[var(--color-text-secondary)] text-sm">
						<span class="text-[var(--color-text-primary)] font-semibold">{data.pokemones.length}</span> resultados
					</span>
					<Pagination currentPage={data.currentPage} hasMore={data.hasMore} pageSize={data.pageSize} />
				</div>
				
				{#if data.pokemones.length > 0}
					<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
						{#each data.pokemones as pokemon}
							<TarjetaPokemon {pokemon} />
						{/each}
					</div>
					
					<!-- Bottom pagination -->
					<div class="flex justify-center pt-8 border-t border-[var(--color-border)]">
						<Pagination currentPage={data.currentPage} hasMore={data.hasMore} pageSize={data.pageSize} />
					</div>
				{:else}
					<EmptyState 
						type="pokemon"
						searchTerm={terminoBusqueda || ($page.url.searchParams.get('nombre') || '')}
						hasFilters={!!tipoSeleccionado || !!terminoBusqueda}
					/>
				{/if}
			</div>
		</div>
	</main>
</div>
