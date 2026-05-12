<script>
	import EmptyState from '$lib/components/EmptyState.svelte';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onMount } from 'svelte';
	
	let { data } = $props();

	onMount(() => {
		hideLoading();
	});

	$effect(() => {
		if (data.movimientos) {
			hideLoading();
		}
	});

	let loadingTimeout;

	function buscarMovimientos() {
		showLoading('Buscando movimientos...');
		clearTimeout(loadingTimeout);
		loadingTimeout = setTimeout(() => {
			hideLoading();
		}, 10000);
	}
	
	function verDetalleMovimiento(movimientoId) {
		showLoading('Cargando detalles del movimiento...');
		window.location.href = `/movimientos/${movimientoId}`;
	}
</script>

<svelte:head>
	<title>Movimientos - IntroDex</title>
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
				<h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">Seccion Movimientos</h1>
				<p class="text-[var(--color-text-secondary)] max-w-2xl">
					Aca podes encontrar todos los movimientos disponibles listados con su informacion
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
							type="submit"
							form="form-filtros-movimientos"
							class="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-medium transition-colors text-sm"
						>
							Buscar
						</button>
						<button 
							type="button"
							class="px-4 py-2 bg-[var(--color-bg-hover)] hover:bg-[var(--color-border-focus)] text-[var(--color-text-secondary)] rounded-lg font-medium transition-colors text-sm"
							onclick={() => window.location.href = window.location.pathname}
						>
							Limpiar
						</button>
					</div>
				</div>
				
				<form method="GET" id="form-filtros-movimientos" class="grid grid-cols-1 md:grid-cols-2 gap-4" onsubmit={buscarMovimientos}>
					<div class="flex flex-col gap-2">
						<label for="nombre_parcial" class="text-sm font-medium text-[var(--color-text-secondary)]">Buscar por nombre</label>
						<div class="relative">
							<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="11" cy="11" r="8"/>
								<line x1="21" y1="21" x2="16.65" y2="16.65"/>
							</svg>
							<input 
								id="nombre_parcial"
								type="text" 
								name="nombre_parcial" 
								placeholder="Ej: Puno fuego, lanzarrocas..." 
								value={data.query}
								class="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
							/>
						</div>
					</div>
					<div class="flex flex-col gap-2">
						<label for="tipo" class="text-sm font-medium text-[var(--color-text-secondary)]">Filtrar por tipo</label>
						<select 
							id="tipo"
							name="tipo" 
							bind:value={data.query2}
							class="w-full px-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
						>
							<option value="">Todos los tipos</option>
							<option value="normal">Normal</option>
							<option value="lucha">Lucha</option>
							<option value="volador">Volador</option>
							<option value="veneno">Veneno</option>
							<option value="tierra">Tierra</option>
							<option value="roca">Roca</option>
							<option value="insecto">Insecto</option>
							<option value="fantasma">Fantasma</option>
							<option value="acero">Acero</option>
							<option value="fuego">Fuego</option>
							<option value="agua">Agua</option>
							<option value="planta">Planta</option>
							<option value="electrico">Electrico</option>
							<option value="psiquico">Psiquico</option>
							<option value="hielo">Hielo</option>
							<option value="dragon">Dragon</option>
							<option value="siniestro">Siniestro</option>
							<option value="hada">Hada</option>
						</select>
					</div>
				</form>
				
				<!-- Active filters -->
				{#if data.query || data.query2}
					<div class="flex items-center gap-2 flex-wrap pt-4 mt-4 border-t border-[var(--color-border)]">
						<span class="text-sm text-[var(--color-text-muted)]">Filtros activos:</span>
						{#if data.query}
							<span class="inline-flex items-center gap-2 bg-[var(--color-bg-elevated)] px-3 py-1.5 rounded-lg text-sm text-[var(--color-text-secondary)] border border-[var(--color-border)]">
								Busqueda: "{data.query}"
								<a href="?tipo={data.query2}" class="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
									<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<line x1="18" y1="6" x2="6" y2="18"/>
										<line x1="6" y1="6" x2="18" y2="18"/>
									</svg>
								</a>
							</span>
						{/if}
						{#if data.query2}
							<span class="inline-flex items-center gap-2 bg-[var(--color-bg-elevated)] px-3 py-1.5 rounded-lg text-sm border border-[var(--color-border)]">
								<EtiquetaTipo tipo={data.query2} tamaño="sm" />
								<a href="?nombre_parcial={data.query}" class="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
									<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<line x1="18" y1="6" x2="6" y2="18"/>
										<line x1="6" y1="6" x2="18" y2="18"/>
									</svg>
								</a>
							</span>
						{/if}
					</div>
				{/if}
			</div>
			
			<!-- Results header -->
			<div class="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
				<span class="text-[var(--color-text-secondary)] text-sm">
					<span class="text-[var(--color-text-primary)] font-semibold">{data.movimientos.length}</span> resultados
				</span>
				<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
			</div>
			
			<!-- Moves grid -->
			{#if data.movimientos.length > 0}
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
					{#each data.movimientos as movimiento}
						<div class="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-border-focus)] hover:shadow-lg transition-all duration-200">
							<!-- Header -->
							<div class="p-4 border-b border-[var(--color-border)] flex items-center justify-between gap-2">
								<h3 class="text-base font-semibold text-[var(--color-text-primary)] capitalize">
									{movimiento.nombre}
								</h3>
								<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
							</div>
							
							<!-- Stats -->
							<div class="p-4">
								<div class="grid grid-cols-3 gap-3 mb-4">
									<div class="text-center">
										<div class="text-lg font-bold text-[var(--color-error)]">
											{movimiento.potencia || '-'}
										</div>
										<div class="text-xs text-[var(--color-text-muted)]">Potencia</div>
									</div>
									<div class="text-center">
										<div class="text-lg font-bold text-[var(--color-accent)]">
											{movimiento.precision || '-'}%
										</div>
										<div class="text-xs text-[var(--color-text-muted)]">Precision</div>
									</div>
									<div class="text-center">
										<div class="text-lg font-bold text-[var(--color-success)]">
											{movimiento.puntos_de_poder}
										</div>
										<div class="text-xs text-[var(--color-text-muted)]">PP</div>
									</div>
								</div>
								
								<!-- Category & Generation -->
								<div class="flex flex-wrap gap-2 mb-4">
									<span class="px-2 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] text-xs rounded-md">
										{movimiento.categoria}
									</span>
									<span class="px-2 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] text-xs rounded-md">
										{movimiento.generacion.nombre}
									</span>
								</div>
								
								<!-- Effect preview -->
								{#if movimiento.efecto}
									<p class="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2 mb-4">
										{movimiento.efecto}
									</p>
								{/if}
								
								<!-- Action -->
								<button 
									onclick={() => verDetalleMovimiento(movimiento.id)}
									class="w-full bg-[var(--color-bg-hover)] hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2"
								>
									<span>Ver detalles</span>
									<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
										<polyline points="9,18 15,12 9,6"/>
									</svg>
								</button>
							</div>
						</div>
					{/each}
				</div>
				
				<!-- Bottom pagination -->
				<div class="flex justify-center pt-8 border-t border-[var(--color-border)]">
					<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
				</div>
			{:else}
				<EmptyState 
					type="movimientos"
					searchTerm={data.query || ''}
					hasFilters={!!(data.query || data.query2)}
				/>
			{/if}
		</div>
	</main>
</div>
