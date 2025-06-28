<script>
	import EmptyState from '$lib/components/EmptyState.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import { showLoading } from '$lib/stores/loading.js';
	export let data;
	//lo busque y es la forma correcta de usar el data $props

	let search = '';
	//variable reactiva?
	$: movimientosFiltrados = data.movimientos.filter((m) =>
		m.nombre.toLowerCase().includes(search.toLowerCase())
	);
	//el lugar donde encontre este tipo de typeahead dice usar este comando
	//usando el filter, movimientosFiltrados es una declaracion reactiva
	//osea que con cada cambio (en este caso de search) va a actualizarse
	//se recorre data.movimientos y como un for, cada paso se llama m
	//y despues el resto es bastante obvio lo que hace
	
	function buscarMovimientos() {
		showLoading('Buscando movimientos...');
		// El loading se ocultará cuando la página se recargue
	}
	
	function verDetalleMovimiento(movimientoId) {
		showLoading('Cargando detalles del movimiento...');
		window.location.href = `/movimientos/${movimientoId}`;
	}
</script>

<svelte:head>
	<title>Movimientos - PokéAPI</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-lg py-8">
	<main class="flex-1">
		<div class="max-w-7xl mx-auto px-4">
			<a href="../" class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors mb-8 shadow">◄ Menu Principal</a>
			<!-- Encabezado de la página -->
			<div class="text-center mb-8">
				<h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 drop-shadow-lg">Sección Movimientos</h1>
				<p class="text-lg text-slate-600 max-w-2xl mx-auto">
					Acá podes encontrar todos los movimientos disponibles listados con su información
				</p>
			</div>
			<!-- Sección de filtros -->
			<div class="bg-white/90 rounded-2xl shadow-lg border border-slate-200 p-8 mb-10">
				<div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
					<h2 class="text-2xl font-bold text-blue-700">Filtros</h2>
					<button 
						type="button"
						class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors text-sm"
						onclick={() => window.location.href = window.location.pathname}
					>
						Limpiar filtros
					</button>
				</div>
				<form method="GET" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" onsubmit={buscarMovimientos}>
					<div class="flex flex-col gap-2">
						<label for="nombre_parcial" class="text-sm font-medium text-slate-700">Buscar por nombre</label>
						<input 
							id="nombre_parcial"
							type="text" 
							name="nombre_parcial" 
							placeholder="Ej: Puño fuego, lanzarrocas..." 
							value={data.query}
							class="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 text-sm bg-slate-50"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<label for="tipo" class="text-sm font-medium text-slate-700">Filtrar por tipo</label>
						<select 
							id="tipo"
							name="tipo" 
							bind:value={data.query2}
							class="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-sm bg-slate-50"
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
							<option value="electrico">Eléctrico</option>
							<option value="psiquico">Psíquico</option>
							<option value="hielo">Hielo</option>
							<option value="dragon">Dragón</option>
							<option value="siniestro">Siniestro</option>
							<option value="hada">Hada</option>
							<option value="oscuro">Oscuro</option>
						</select>
					</div>
					<div class="flex flex-col gap-2 justify-end">
						<button 
							type="submit"
							class="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-pink-500 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-md w-full"
						>
							Buscar
						</button>
					</div>
				</form>
				<!-- Filtros activos -->
				{#if data.query || data.query2}
					<div class="flex items-center gap-2 flex-wrap pt-4 border-t border-slate-200">
						<span class="text-sm font-medium text-slate-600">Filtros activos:</span>
						{#if data.query}
							<span class="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md text-sm border border-slate-200">
								Búsqueda: "{data.query}"
								<a href="?tipo={data.query2}" class="text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center transition-colors">×</a>
							</span>
						{/if}
						{#if data.query2}
							<span class="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-md text-sm border border-slate-200">
								Tipo: {data.query2}
								<a href="?nombre_parcial={data.query}" class="text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center transition-colors">×</a>
							</span>
						{/if}
					</div>
				{/if}
			</div>
			<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
			<!-- Lista de movimientos en formato de cards -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
				{#each movimientosFiltrados as movimiento}
					<div class="bg-white/90 rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative flex flex-col">
						<!-- Header de la card -->
						<div class="p-5 border-b border-slate-100 flex items-center justify-between gap-2 bg-gradient-to-r from-blue-100 to-pink-100">
							<h3 class="text-xl font-extrabold text-slate-800 capitalize leading-tight flex items-center gap-2">
								<svg class="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2H7v-2h2V7h2v2h2v2h-2v2z"/></svg>
								{movimiento.nombre}
							</h3>
							<span class="px-3 py-1 bg-blue-200 text-blue-800 text-xs font-bold rounded-full shadow">
								{movimiento.tipo.nombre}
							</span>
						</div>
						<!-- Stats del movimiento -->
						<div class="p-5 flex-1 flex flex-col justify-between">
							<div class="grid grid-cols-3 gap-4 mb-4">
								<div class="text-center">
									<div class="text-lg sm:text-xl font-bold text-blue-700">
										{movimiento.potencia || '-'}
									</div>
									<div class="text-xs text-slate-600 font-medium">Potencia</div>
								</div>
								<div class="text-center">
									<div class="text-lg sm:text-xl font-bold text-pink-600">
										{movimiento.precision || '-'}%
									</div>
									<div class="text-xs text-slate-600 font-medium">Precisión</div>
								</div>
								<div class="text-center">
									<div class="text-lg sm:text-xl font-bold text-purple-700">
										{movimiento.puntos_de_poder}
									</div>
									<div class="text-xs text-slate-600 font-medium">PP</div>
								</div>
							</div>
							<!-- Categoría y generación -->
							<div class="flex flex-wrap gap-2 mb-3">
								<span class="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
									{movimiento.categoria}
								</span>
								<span class="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
									Gen: {movimiento.generacion.nombre}
								</span>
							</div>
							<!-- Efecto -->
							{#if movimiento.efecto}
								<div class="bg-slate-50 rounded-md p-3 mb-2">
									<p class="text-sm text-slate-700 leading-relaxed">
										<span class="font-medium text-slate-800">Efecto:</span>
										{movimiento.efecto}
									</p>
								</div>
							{/if}
							<!-- Acciones -->
							<div class="flex justify-end mt-auto">
								<button 
									onclick={() => verDetalleMovimiento(movimiento.id)}
									class="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 ml-3"
									title={`Ver detalles de ${movimiento.nombre}`}
									aria-label={`Ver detalles de ${movimiento.nombre}`}
								>
									<svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
										<path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
				{:else}
					<div class="col-span-full">
						<EmptyState 
							type="movimientos"
							searchTerm={search}
							hasFilters={!!search}
							icon="⚔️"
						/>
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>
