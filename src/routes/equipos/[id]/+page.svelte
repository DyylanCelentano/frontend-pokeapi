<script>
	import EmptyState from '$lib/components/EmptyState.svelte';
	import Typeahead from '$lib/components/Typeahead.svelte';
	import { API_URL } from '$lib/constantes/index';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';

	let { data } = $props();

	// Variables para formularios
	let idPokemonNuevo = $state('');
	let apodoNuevo = $state('');
	let integranteParaMovimiento = $state('');
	let movimientoSeleccionado = $state('');
	let integranteParaEditar = $state('');
	let nuevoApodo = $state('');

	// Variables de estado generales
	let mensajeError = $state('');
	let mensajeExito = $state('');

	// Limpiar mensajes después de 5 segundos
	$effect(() => {
		if (mensajeError || mensajeExito) {
			setTimeout(() => {
				mensajeError = '';
				mensajeExito = '';
			}, 5000);
		}
	});

	function limpiarFormularioNuevoIntegrante() {
		idPokemonNuevo = '';
		apodoNuevo = '';
	}

	function limpiarFormularioMovimiento() {
		integranteParaMovimiento = '';
		movimientoSeleccionado = '';
	}

	function limpiarFormularioEdicion() {
		integranteParaEditar = '';
		nuevoApodo = '';
	}

	function validarLimiteIntegrantes() {
		if (data.equipo.integrantes.length >= 6) {
			mensajeError = 'Este equipo ya tiene el máximo de 6 integrantes.';
			return false;
		}
		return true;
	}

	function validarLimiteMovimientos(integrante) {
		if (integrante.movimientos && integrante.movimientos.length >= 4) {
			mensajeError = `${integrante.apodo} ya tiene el máximo de 4 movimientos.`;
			return false;
		}
		return true;
	}

	function obtenerIntegrantePorId(id) {
		return data.equipo.integrantes.find((i) => i.id == id);
	}

	// Formatear movimientos para mostrar en tabla (máximo 4 columnas)
	function obtenerMovimientosFormateados(integrante) {
		const movimientos = integrante.movimientos || [];
		const resultado = [null, null, null, null];

		for (let i = 0; i < Math.min(movimientos.length, 4); i++) {
			resultado[i] = movimientos[i];
		}

		return resultado;
	}

	// Validaciones específicas
	function tieneMovimientoDuplicado(integrante, nuevoMovimientoId) {
		return integrante.movimientos?.some((mov) => mov.id == nuevoMovimientoId) || false;
	}

	function manejarEnvioCrearIntegrante() {
		if (!validarLimiteIntegrantes()) return false;
		showLoading('Agregando integrante...');
		setTimeout(() => {
			limpiarFormularioNuevoIntegrante();
			mensajeExito = 'Integrante agregado exitosamente.';
			hideLoading();
		}, 100);
		return true;
	}

	function manejarEnvioAgregarMovimiento() {
		const integrante = obtenerIntegrantePorId(integranteParaMovimiento);
		if (!integrante) {
			mensajeError = 'Debe seleccionar un integrante válido.';
			return false;
		}

		if (!validarLimiteMovimientos(integrante)) return false;

		if (tieneMovimientoDuplicado(integrante, movimientoSeleccionado)) {
			mensajeError = 'Este integrante ya tiene ese movimiento.';
			return false;
		}

		showLoading('Agregando movimiento...');
		setTimeout(() => {
			limpiarFormularioMovimiento();
			mensajeExito = 'Movimiento agregado exitosamente.';
			hideLoading();
		}, 100);
		return true;
	}

	function manejarEnvioEditarIntegrante() {
		if (!integranteParaEditar) {
			mensajeError = 'Debe seleccionar un integrante para editar.';
			return false;
		}

		showLoading('Editando integrante...');
		setTimeout(() => {
			limpiarFormularioEdicion();
			mensajeExito = 'Integrante editado exitosamente.';
			hideLoading();
		}, 100);
		return true;
	}

	function manejarEliminarIntegrante() {
		showLoading('Eliminando integrante...');
		return true;
	}
</script>

<svelte:head>
	<title>{data.equipo.nombre} - Equipos - PokéAPI</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 text-lg py-8">
	<div class="max-w-7xl mx-auto px-4">
		<a
			href="../"
			class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors mb-6"
		>
			<span class="text-xl">←</span>
			Volver a Equipos
		</a>

		<!-- Header del equipo -->
		<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
			<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div class="flex-1">
					<h1 class="text-3xl font-bold text-slate-800 mb-2">{data.equipo.nombre}</h1>
					<div class="flex items-center gap-4 text-sm text-slate-600">
						<span>📍 Generación {data.equipo.generacion.numero}</span>
						<span>👥 {data.equipo.integrantes.length}/6 integrantes</span>
					</div>
				</div>
				
				<!-- Barra de progreso del equipo -->
				<div class="w-full lg:w-64">
					<div class="flex justify-between text-sm text-slate-600 mb-2">
						<span>Progreso del equipo</span>
						<span>{data.equipo.integrantes.length}/6</span>
					</div>
					<div class="w-full bg-slate-200 rounded-full h-3">
						<div 
							class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
							style="width: {(data.equipo.integrantes.length / 6) * 100}%"
						></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Mensajes de estado -->
		{#if mensajeError}
			<div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-6">
				<div class="flex items-center">
					<svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
							clip-rule="evenodd"
						></path>
					</svg>
					{mensajeError}
				</div>
			</div>
		{/if}

		{#if mensajeExito}
			<div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-6">
				<div class="flex items-center">
					<svg class="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
							clip-rule="evenodd"
						></path>
					</svg>
					{mensajeExito}
				</div>
			</div>
		{/if}

		<h3 class="text-2xl font-bold text-slate-800 mb-6">
			Integrantes de {data.equipo.nombre}
			<span class="text-sm font-normal text-slate-600">({data.equipo.integrantes.length}/6)</span>
		</h3>

		{#if data.equipo.integrantes.length === 0}
			<EmptyState
				title="Sin integrantes"
				message="Este equipo aún no tiene integrantes. ¡Comienza agregando tu primer Pokémon!"
				icon="👥"
				suggestions={[
					"Usa el formulario de abajo para agregar un nuevo integrante",
					"Cada equipo puede tener hasta 6 integrantes",
					"Cada integrante puede aprender hasta 4 movimientos"
				]}
			/>
		{:else}
			<!-- Lista de integrantes en formato de cards -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{#each data.equipo.integrantes as integrante}
					{@const movimientosFormateados = obtenerMovimientosFormateados(integrante)}
					<div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
						<!-- Header con info básica del integrante -->
						<div class="p-4 sm:p-6 border-b border-slate-100">
							<div class="flex items-start justify-between mb-4">
								<div class="flex-1">
									<h4 class="text-lg font-bold text-slate-800 mb-1">
										{integrante.apodo}
									</h4>
									<a
										href="/pokemones/{integrante.pokemon.id}"
										class="text-blue-600 hover:text-blue-800 font-medium text-sm"
									>
										{integrante.pokemon.nombre}
									</a>
								</div>
								<div class="flex items-center gap-2">
									<img
										src={integrante.pokemon.imagen}
										alt={integrante.pokemon.nombre}
										class="w-16 h-16 object-contain rounded-lg bg-slate-50"
									/>
									<form action="?/eliminar_integrante" method="POST" onsubmit={manejarEliminarIntegrante}>
										<input type="hidden" name="integrante_id" value={integrante.id} />
										<input type="hidden" name="id_equipo" value={data.equipo.id} />
										<button
											class="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors"
											aria-label="Eliminar integrante {integrante.apodo}"
											title="Eliminar {integrante.apodo}"
										>
											<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
												<path
													fill-rule="evenodd"
													d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2v1a1 1 0 001 1h6a1 1 0 001-1V3a2 2 0 012 2v6.5l1.707 1.707A1 1 0 0117 14H3a1 1 0 01-.707-1.707L4 10.5V5zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
													clip-rule="evenodd"
												></path>
											</svg>
										</button>
									</form>
								</div>
							</div>
						</div>
						
						<!-- Movimientos -->
						<div class="p-4 sm:p-6">
							<h5 class="text-sm font-semibold text-slate-700 mb-3">Movimientos ({integrante.movimientos.length}/4)</h5>
							<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
								{#each movimientosFormateados as movimiento, i}
									<div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
										{#if movimiento}
											<div class="flex-1">
												<span class="text-sm font-medium text-slate-800">{movimiento.nombre}</span>
											</div>
											<a
												href="/movimientos/{movimiento.id}"
												class="w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-white flex items-center justify-center ml-2"
												aria-label="Ver detalles de {movimiento.nombre}"
												title="Ver {movimiento.nombre}"
											>
												<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
													<path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
													<path
														fill-rule="evenodd"
														d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
														clip-rule="evenodd"
													></path>
												</svg>
											</a>
										{:else}
											<div class="flex-1">
												<span class="text-slate-400 italic text-sm">Espacio libre</span>
											</div>
											<div class="w-8 h-8 bg-slate-200 rounded-md flex items-center justify-center">
												<span class="text-slate-400 text-xs">+</span>
											</div>
										{/if}
									</div>
								{/each}
							</div>
							
							<!-- Progreso de movimientos -->
							<div class="mt-4">
								<div class="flex justify-between text-xs text-slate-600 mb-1">
									<span>Movimientos aprendidos</span>
									<span>{integrante.movimientos.length}/4</span>
								</div>
								<div class="w-full bg-slate-200 rounded-full h-2">
									<div class="bg-green-600 h-2 rounded-full transition-all duration-300" style="width: {(integrante.movimientos.length / 4) * 100}%"></div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Grid de tres formularios -->
		<div class="grid md:grid-cols-3 gap-6 mt-8">
			<!-- 1. Formulario: Crear nuevo integrante -->
			<section class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
				<h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center">
					<span
						class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm mr-3"
						>1</span
					>
					Crear Integrante
				</h2>

				{#if data.equipo.integrantes.length >= 6}
					<div
						class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-3 py-2 rounded-md text-sm"
					>
						<div class="flex items-center">
							<svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
								<path
									fill-rule="evenodd"
									d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
									clip-rule="evenodd"
								></path>
							</svg>
							Equipo completo (6/6)
						</div>
					</div>
				{:else}
					<form
						action="?/agregar_integrante"
						method="POST"
						class="space-y-4"
						onsubmit={manejarEnvioCrearIntegrante}
					>
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<input type="hidden" name="id_pokemon" bind:value={idPokemonNuevo} />
						<div>
							<label for="pokemon-nuevo" class="block text-sm font-medium text-slate-700 mb-2">
								Pokémon <span class="text-red-500">*</span>
							</label>
							<div id="pokemon-nuevo">
								<Typeahead
									endpoint="{API_URL}/pokemon/"
									placeholder="Buscar Pokémon..."
									on:select={(event) => {
										idPokemonNuevo = event.detail.result.id;
										mensajeError = '';
									}}
								/>
							</div>
						</div>

						<div>
							<label for="apodo-nuevo" class="block text-sm font-medium text-slate-700 mb-2">
								Apodo <span class="text-red-500">*</span>
							</label>
							<input
								id="apodo-nuevo"
								type="text"
								name="apodo"
								bind:value={apodoNuevo}
								required
								maxlength="50"
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm h-10"
								placeholder="Apodo del integrante"
							/>
						</div>

						<button
							type="submit"
							disabled={!idPokemonNuevo || !apodoNuevo}
							class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-md transition-colors text-sm"
						>
							Agregar Integrante
						</button>
					</form>
				{/if}
			</section>

			<!-- 2. Formulario: Agregar movimiento -->
			<section class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
				<h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center">
					<span
						class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm mr-3"
						>2</span
					>
					Agregar Movimiento
				</h2>

				{#if data.equipo.integrantes.length === 0}
					<div class="bg-gray-50 border border-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm">
						Sin integrantes en el equipo
					</div>
				{:else}
					<form
						action="?/agregar_movimiento"
						method="POST"
						class="space-y-4"
						onsubmit={manejarEnvioAgregarMovimiento}
					>
						<!-- CAMPO OCULTO PARA ID DEL EQUIPO -->
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<input type="hidden" name="id_movimiento" bind:value={movimientoSeleccionado} />
						<div>
							<label for="integrante-movimiento" class="block text-sm font-medium text-slate-700 mb-2">
								Integrante <span class="text-red-500">*</span>
							</label>
							<select
								id="integrante-movimiento"
								name="id_integrante"
								bind:value={integranteParaMovimiento}
								required
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm h-10"
							>
								<option value="">Selecciona un integrante</option>
								{#each data.equipo.integrantes as integrante}
									<option value={integrante.id}>
										{integrante.apodo} - {integrante.pokemon.nombre}
									</option>
								{/each}
							</select>
						</div>

						<div>
							<label for="movimiento" class="block text-sm font-medium text-slate-700 mb-2">
								Movimiento <span class="text-red-500">*</span>
							</label>
							<div id="movimiento">
								<Typeahead
									endpoint="{API_URL}/movimientos/"
									placeholder="Buscar movimiento..."
									on:select={(event) => {
										movimientoSeleccionado = event.detail.result.id;
										mensajeError = '';
									}}
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={!integranteParaMovimiento || !movimientoSeleccionado}
							class="w-full bg-green-600 hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-md transition-colors text-sm"
						>
							Agregar Movimiento
						</button>
					</form>
				{/if}
			</section>

			<!-- 3. Formulario: Editar integrante -->
			<section class="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
				<h2 class="text-lg font-semibold text-slate-800 mb-4 flex items-center">
					<span
						class="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm mr-3"
						>3</span
					>
					Editar Integrante
				</h2>

				{#if data.equipo.integrantes.length === 0}
					<div class="bg-gray-50 border border-gray-200 text-gray-600 px-3 py-2 rounded-md text-sm">
						Sin integrantes en el equipo
					</div>
				{:else}
					<form
						action="?/editar_integrante"
						method="POST"
						class="space-y-4"
						onsubmit={manejarEnvioEditarIntegrante}
					>
						<!-- CAMPO OCULTO PARA ID DEL EQUIPO -->
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<div>
							<label for="integrante-editar" class="block text-sm font-medium text-slate-700 mb-2">
								Integrante <span class="text-red-500">*</span>
							</label>
							<select
								id="integrante-editar"
								name="id_integrante"
								bind:value={integranteParaEditar}
								required
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm h-10"
							>
								<option value="">Selecciona un integrante</option>
								{#each data.equipo.integrantes as integrante}
									<option value={integrante.id}>
										{integrante.apodo} - {integrante.pokemon.nombre}
									</option>
								{/each}
							</select>
						</div>

						<div>
							<label for="nuevo-apodo-editar" class="block text-sm font-medium text-slate-700 mb-2">
								Nuevo apodo <span class="text-red-500">*</span>
							</label>
							<input
								id="nuevo-apodo-editar"
								type="text"
								name="apodo"
								bind:value={nuevoApodo}
								required
								maxlength="50"
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm h-10"
								placeholder="Nuevo apodo"
							/>
						</div>

						<button
							type="submit"
							disabled={!integranteParaEditar || !nuevoApodo}
							class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-md transition-colors text-sm"
						>
							Editar Integrante
						</button>
					</form>
				{/if}
			</section>
		</div>
	</div>
</div>
