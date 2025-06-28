<script>
	import { enhance } from '$app/forms';
	import Pagination from '$lib/components/Pagination.svelte';
	export let data;

	let search = '';
	let exito = false;
	let error = '';

	$: equiposFiltrados = data.equipos.filter((m) =>
		m.nombre.toLowerCase().includes(search.toLowerCase())
	);
	function mostrarBannerEquipoCreado() {
		exito = true;
		setTimeout(() => {
			exito = false;
		}, 3000);
	}
</script>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-lg py-8">
	<main class="flex-1">
		<div class="max-w-7xl mx-auto px-4">
			<a href="../" class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors mb-8 shadow">◄ Menu Principal</a>
			<!-- Encabezado de la página -->
			<div class="text-center mb-8">
				<h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-4 drop-shadow-lg">Equipos Pokémon</h1>
				<h3 class="text-xl text-slate-600 font-medium">
					¡Crea, explora y gestiona tus equipos favoritos!
				</h3>
			</div>
			<!-- Formulario para crear equipo -->
			<div class="bg-white/90 p-8 rounded-2xl border border-slate-200 mb-10 shadow-lg max-w-xl mx-auto">
				<h2 class="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
					<svg class="w-7 h-7 text-pink-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2H7v-2h2V7h2v2h2v2h-2v2z"/></svg>
					Crear Equipo
				</h2>
				<h6 class="text-sm text-slate-500 mb-4">No puede haber nombres repetidos</h6>
				<form
					method="POST"
					action="?/create"
					class="space-y-4"
					use:enhance={() => {
						mostrarBannerEquipoCreado();
					}}
				>
					<label class="block">
						<span class="text-sm font-medium text-slate-700 block mb-1">Nombre:</span>
						<input
							name="nombre"
							autocomplete="off"
							required
							class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm bg-slate-50"
						/>
					</label>
					<label class="block">
						<span class="text-sm font-medium text-slate-700 block mb-1">Generación del Equipo:</span>
						<select
							name="id_generacion"
							required
							class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-sm bg-slate-50"
						>
							<option value="">-- Seleccionar --</option>
							<option value="1">Generación I</option>
							<option value="2">Generación II</option>
							<option value="3">Generación III</option>
							<option value="4">Generación IV</option>
							<option value="5">Generación V</option>
							<option value="6">Generación VI</option>
							<option value="7">Generación VII</option>
							<option value="8">Generación VIII</option>
						</select>
					</label>
					<button
						type="submit"
						class="bg-gradient-to-r from-blue-600 to-pink-500 hover:from-pink-500 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-md"
					>
						Guardar
					</button>
				</form>
				{#if exito}
					<div class="mt-4 p-3 bg-gradient-to-r from-green-200 to-green-100 border border-green-300 rounded-md text-green-900 font-semibold flex items-center gap-2 animate-fade-in">
						<svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" clip-rule="evenodd"/></svg>
						Equipo creado con éxito
					</div>
				{/if}
			</div>

			<!-- Buscador -->
			<div class="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
				<input
					type="text"
					placeholder="Buscar equipo por nombre..."
					bind:value={search}
					class="w-full sm:w-96 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 shadow-sm bg-white"
				/>
				<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
			</div>

			<!-- Lista de equipos en formato de cards -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each equiposFiltrados as equipo}
					<div class="bg-white/90 rounded-2xl border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group relative flex flex-col">
						<!-- Header de la card -->
						<div class="p-5 border-b border-slate-100 flex items-center justify-between gap-2 bg-gradient-to-r from-blue-100 to-pink-100">
							<h3 class="text-xl font-extrabold text-slate-800 leading-tight flex items-center gap-2">
								<svg class="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2H7v-2h2V7h2v2h2v2h-2v2z"/></svg>
								{equipo.nombre}
							</h3>
							<span class="px-3 py-1 bg-purple-200 text-purple-800 text-xs font-bold rounded-full shadow">
								{equipo.generacion.nombre}
							</span>
						</div>
						<!-- Stats del equipo -->
						<div class="p-5 flex-1 flex flex-col justify-between">
							<div class="flex items-center justify-between mb-4">
								<div class="text-center">
									<div class="text-3xl font-extrabold text-blue-700">
										{equipo.cantidad_integrantes}
									</div>
									<div class="text-xs text-slate-600 font-medium">Integrantes</div>
								</div>
								<div class="text-center">
									<div class="text-lg font-bold text-pink-600">
										{6 - equipo.cantidad_integrantes}
									</div>
									<div class="text-xs text-slate-600 font-medium">Espacios libres</div>
								</div>
							</div>
							<!-- Barra de progreso -->
							<div class="mb-4">
								<div class="flex justify-between text-xs text-slate-600 mb-1">
									<span>Equipo</span>
									<span>{equipo.cantidad_integrantes}/6</span>
								</div>
								<div class="w-full bg-slate-200 rounded-full h-2">
									<div class="bg-gradient-to-r from-blue-500 to-pink-500 h-2 rounded-full transition-all duration-300" style="width: {(equipo.cantidad_integrantes / 6) * 100}%"></div>
								</div>
							</div>
							<!-- Acciones -->
							<div class="flex justify-between items-center mt-auto">
								<a
									href={`/equipos/${equipo.id}`}
									class="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-md transition-colors mr-2 text-center shadow"
									aria-label={`Ver detalles de ${equipo.nombre}`}
								>
									Ver equipo
								</a>
								<form 
									action="?/eliminar_equipo" 
									method="POST" 
									class="flex-shrink-0"
									use:enhance={() => {}}
								>
									<input type="hidden" name="id_equipo" value={equipo.id} />
									<button
										type="submit"
										class="w-10 h-10 bg-red-50 hover:bg-red-100 text-red-600 rounded-md transition-colors flex items-center justify-center shadow"
										title={`Eliminar equipo ${equipo.nombre}`}
										aria-label={`Eliminar equipo ${equipo.nombre}`}
									>
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
											<path fill-rule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707A1 1 0 0117 14H3a1 1 0 01-.707-1.707L4 10.5V5zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path>
										</svg>
									</button>
								</form>
							</div>
						</div>
					</div>
				{:else}
					<div class="col-span-full">
						<div class="bg-white/80 rounded-xl p-8 text-center text-slate-500 shadow-md">
							<p class="text-2xl mb-2">😕 No hay equipos para mostrar</p>
							<p class="mb-2">Crea tu primer equipo usando el formulario de arriba</p>
							<p class="mb-2">Verifica la ortografía si estás buscando un equipo específico</p>
							<p>Todos los equipos creados aparecerán aquí</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</main>
</div>

<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease;
}
</style>
