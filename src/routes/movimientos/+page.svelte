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

<div class="min-h-screen bg-slate-50 text-lg py-8">
	<div class="max-w-7xl mx-auto px-4">
		<a href="../" class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors mb-8">◄ Menu Principal</a>
		
		<!-- Encabezado de la página -->
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-slate-800 mb-4">Sección Movimientos</h1>
			<p class="text-lg text-slate-600 max-w-2xl mx-auto">
				Acá podes encontrar todos los movimientos disponibles listados con su información
			</p>
		</div>	
		
		<!-- Sección de filtros -->
		<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">

			<div class="flex justify-between items-center mb-6"> <!-- parte de arriba -->

				<h2 class="text-xl font-semibold text-slate-800">Filtros</h2>

				<button 
					type="button"
					class="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors text-sm"
					onclick={() => window.location.href = window.location.pathname}
				>
					Limpiar filtros
				</button>

			</div> <!-- parte de arriba -->
			
			<form method="GET" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" onsubmit={buscarMovimientos}> <!-- Formulario -->

				<div class="flex flex-col gap-2"> <!-- Buscar por nombre -->
					<label for="nombre_parcial" class="text-sm font-medium text-slate-700">Buscar por nombre</label>
					<input 
						id="nombre_parcial"
						type="text" 
						name="nombre_parcial" 
						placeholder="Ej: Puño fuego, lanzarrocas..." 
						value={data.query}
						class="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
					/>
				</div> <!-- Buscar por nombre -->

				<div class="flex flex-col gap-2"> <!-- Filtrar por tipo -->
					<label for="tipo" class="text-sm font-medium text-slate-700">Filtrar por tipo</label>
					<select 
						id="tipo"
						name="tipo" 
						bind:value={data.query2}
						class="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white"
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
				</div> <!-- Filtrar por tipo -->

				<div class="flex flex-col gap-2 justify-end"> <!-- Boton buscar -->
					<button 
						type="submit"
						class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors w-full"
					>
						Buscar
					</button>
				</div> <!-- Boton buscar -->
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
		
		<div class="overflow-x-auto">
			<table class="w-full text-base">
				<thead>
					<tr class="bg-slate-50">
						<th class="border border-slate-300 p-2 text-center font-semibold">Ir al Movimiento</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Nombre del Movimiento</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Generacion del Movimiento</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Tipo del Movimiento</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Categoria</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Potencia</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Precision</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Puntos de Poder</th>
						<th class="border border-slate-300 p-2 text-center font-semibold">Efecto</th>
					</tr>
				</thead>
				<tbody>
					{#each movimientosFiltrados as movimiento}
						<tr class="hover:bg-slate-50 transition-colors">
							<td class="border border-slate-300 p-2 text-center">
								<button 
									onclick={() => verDetalleMovimiento(movimiento.id)}
									class="bg-slate-800 hover:bg-slate-600 transition-colors duration-200 border-0 rounded-full w-10 h-10 inline-flex items-center justify-center cursor-pointer"
								>
									<img
										src="https://img.icons8.com/ios-filled/24/ffffff/visible.png"
										alt="Ver Movimiento"
										class="w-6 h-6"
									/>
								</button>
							</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.nombre}</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.generacion.nombre}</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.tipo.nombre}</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.categoria}</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.potencia}</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.precision}</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.puntos_de_poder}</td>
							<td class="border border-slate-300 p-2 text-center">{movimiento.efecto}</td>
						</tr>
					{:else}
						<tr>
							<td colspan="9" class="border border-slate-300 p-8">
								<EmptyState 
									type="movimientos"
									searchTerm={search}
									hasFilters={!!search}
									icon="⚔️"
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
