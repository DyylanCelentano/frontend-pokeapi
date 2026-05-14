<script>
	import EmptyState from '$lib/components/EmptyState.svelte';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onMount } from 'svelte';
	
	let { data } = $props();
	let query = $state('');
	let queryTipo = $state('');

	$effect(() => {
		query = data.query || '';
		queryTipo = data.query2 || '';
	});

	// Ocultar loading cuando la página se monta
	onMount(() => {
		hideLoading();
	});

	// Ocultar loading cuando los datos cambian (reactivo)
	$effect(() => {
		if (data.movimientos) {
			hideLoading();
		}
	});

	// Timeout de seguridad para ocultar loading si tarda mucho
	let loadingTimeout;

	function buscarMovimientos() {
		showLoading('Buscando movimientos...');
		
		// Timeout de seguridad: ocultar loading después de 10 segundos máximo
		clearTimeout(loadingTimeout);
		loadingTimeout = setTimeout(() => {
			hideLoading();
		}, 10000);
		
		// El loading se ocultará automáticamente cuando los datos cambien
	}
	
	function verDetalleMovimiento(movimientoId) {
		showLoading('Cargando detalles del movimiento...');
		window.location.href = `/movimientos/${movimientoId}`;
	}
</script>

<svelte:head>
	<title>IntroDex | Movimientos</title>
</svelte:head>

<div class="page-shell">
	<main class="app-main">
		<section class="ui-section">
			<div class="ui-container">
				<a href="../" class="back-link">Volver al inicio</a>
				<div class="page-header">
					<div>
						<p class="ui-kicker">Movimientos</p>
						<h1>Movimientos y habilidades</h1>
					</div>
				</div>

				<div class="filter-panel ui-surface">
					<div class="filter-header">
						<div>
							<h2>Filtros</h2>
						</div>
						<div class="filter-actions">
							<button type="submit" form="form-filtros-movimientos" class="ui-button primary">
								Buscar
							</button>
							<button
								type="button"
								class="ui-button ghost"
								onclick={() => (window.location.href = window.location.pathname)}
							>
								Limpiar filtros
							</button>
						</div>
					</div>
					<form method="GET" id="form-filtros-movimientos" class="filter-grid" onsubmit={buscarMovimientos}>
						<div>
							<label for="nombre_parcial">Buscar por nombre</label>
							<input
								id="nombre_parcial"
								type="text"
								name="nombre_parcial"
								placeholder="Ej: Punio fuego, lanzarrocas..."
								bind:value={query}
								class="ui-input"
							/>
						</div>
						<div>
							<label for="tipo">Filtrar por tipo</label>
							<select id="tipo" name="tipo" bind:value={queryTipo} class="ui-select">
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
								<option value="oscuro">Oscuro</option>
							</select>
						</div>
					</form>
					{#if query || queryTipo}
						<div class="filter-chips">
							<span class="ui-pill">Filtros activos</span>
							{#if query}
								<span class="ui-chip">
									Busqueda: "{query}"
									<a href="?tipo={queryTipo}" class="chip-button">×</a>
								</span>
							{/if}
							{#if queryTipo}
								<span class="ui-chip">
									Tipo: {queryTipo}
									<a href="?nombre_parcial={query}" class="chip-button">×</a>
								</span>
							{/if}
						</div>
					{/if}
				</div>

				<div class="results-header">
					<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
				</div>

				<div class="ui-grid ui-grid-3 move-grid">
					{#each data.movimientos as movimiento}
						<div class="move-card ui-card">
							<div class="move-card__header">
								<div>
									<h3>{movimiento.nombre}</h3>
									<span class="ui-pill">{movimiento.categoria}</span>
								</div>
								<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
							</div>
							<div class="move-card__stats">
								<div>
									<span>Potencia</span>
									<strong>{movimiento.potencia || '-'}</strong>
								</div>
								<div>
									<span>Precision</span>
									<strong>{movimiento.precision || '-'}%</strong>
								</div>
								<div>
									<span>PP</span>
									<strong>{movimiento.puntos_de_poder}</strong>
								</div>
							</div>
							<div class="move-card__meta">
								<span class="ui-tag">Gen {movimiento.generacion.nombre}</span>
							</div>
							{#if movimiento.efecto}
								<p class="move-card__effect">{movimiento.efecto}</p>
							{/if}
							<button
								onclick={() => verDetalleMovimiento(movimiento.id)}
								class="ui-button ghost"
							>
								Ver detalles
							</button>
						</div>
					{:else}
						<div class="col-span-full">
							<EmptyState
								type="movimientos"
								searchTerm={data.query || ''}
								hasFilters={!!(data.query || data.query2)}
							/>
						</div>
					{/each}
				</div>
			</div>
		</section>
	</main>
</div>
