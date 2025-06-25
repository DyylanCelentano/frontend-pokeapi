<script>
	import Typeahead from '$lib/components/Typeahead.svelte';
	import { API_URL } from '$lib/constantes/index.js';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onMount } from 'svelte';

	let { data } = $props();
	
	// Mostrar loading al cargar la página
	onMount(() => {
		showLoading('Cargando información del equipo...');
		setTimeout(() => {
			hideLoading();
		}, 600);
	});

	// Variables de estado para la información del equipo
	let modificarEquipo = $state(0);

	// Variables para crear nuevo integrante
	let idPokemonNuevo = $state('');
	let apodoNuevo = $state('');

	// Variables para agregar movimiento
	let integranteParaMovimiento = $state('');
	let movimientoSeleccionado = $state('');

	// Variables para editar integrante
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

<div class="min-h-screen bg-slate-50 text-lg py-8">
	<div class="max-w-7xl mx-auto px-4">
		<a
			href="../"
			class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors mb-8"
		>
			◄ Menu Principal
		</a>

		<!-- Información del equipo -->
		<div class="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
			<div class="flex items-center justify-between mb-4">
				<h1 class="text-3xl font-bold text-slate-800">{data.equipo.nombre}</h1>
				<button
					class="text-blue-600 hover:text-blue-800 font-medium"
					onclick={() => (modificarEquipo = modificarEquipo === 0 ? 1 : 0)}
				>
					{modificarEquipo === 0 ? 'Editar equipo' : 'Cancelar'}
				</button>
			</div>

			{#if modificarEquipo === 0}
				<div class="space-y-2">
					<p class="text-slate-600">
						<span class="font-medium">Generación máxima:</span>
						{data.equipo.generacion?.nombre || 'No especificada'}
					</p>
					<p class="text-slate-600">
						<span class="font-medium">Integrantes:</span>
						{data.equipo.integrantes.length}/6
					</p>
				</div>
			{:else}
				<form action="?/actualizar_equipo" method="POST" class="space-y-4">
					<input type="hidden" name="id_equipo" value={data.equipo.id} />

					<div>
						<label for="nombre-equipo" class="block text-sm font-medium text-slate-700 mb-2">
							Nombre del equipo:
						</label>
						<input
							id="nombre-equipo"
							type="text"
							name="nombre"
							value={data.equipo.nombre}
							required
							maxlength="100"
							class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>

					<div>
						<label for="generacion" class="block text-sm font-medium text-slate-700 mb-2">
							Generación máxima:
						</label>
						<select
							id="generacion"
							name="id_generacion"
							value={data.equipo.generacion?.id || ''}
							required
							class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">-- Seleccionar Generación --</option>
							<!--eliminar generacion 9, aunque queda bien para mostrar el caso de error xd-->
							{#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as gen}
								<option value={gen}>Generación {gen}</option>
							{/each}
						</select>
					</div>

					<div class="flex gap-2">
						<button
							type="submit"
							class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
						>
							Guardar cambios
						</button>
						<button
							type="button"
							class="bg-slate-300 hover:bg-slate-400 text-slate-700 font-medium py-2 px-4 rounded-md transition-colors"
							onclick={() => (modificarEquipo = 0)}
						>
							Cancelar
						</button>
					</div>
				</form>
			{/if}
		</div>

		<!-- Mensajes de estado -->
		{#if mensajeError}
			<div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md mb-4">
				<div class="flex items-center">
					<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						></path>
					</svg>
					{mensajeError}
				</div>
			</div>
		{/if}

		{#if mensajeExito}
			<div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md mb-4">
				<div class="flex items-center">
					<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
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
		<div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
			<table class="w-full table-auto">
				<thead>
					<tr class="bg-slate-50">
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Eliminar</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Nombre del Integrante</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Pokemon Integrante</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Así se ve el Pokemon</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Movimiento 1</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Ver Mov. 1</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Movimiento 2</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Ver Mov. 2</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Movimiento 3</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Ver Mov. 3</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Movimiento 4</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold text-slate-700"
							>Ver Mov. 4</th
						>
					</tr>
				</thead>
				<tbody>
					{#each data.equipo.integrantes as integrante}
						{@const movimientosFormateados = obtenerMovimientosFormateados(integrante)}
						<tr class="hover:bg-slate-50 transition-colors">
							<td class="border border-slate-300 p-3 text-center">
								<form action="?/eliminar_integrante" method="POST" onsubmit={manejarEliminarIntegrante}>
									<input type="hidden" name="integrante_id" value={integrante.id} />
									<input type="hidden" name="id_equipo" value={data.equipo.id} />
									<button
										class="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-50 transition-colors"
										aria-label="Eliminar integrante {integrante.apodo}"
									>
										<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
											<path
												fill-rule="evenodd"
												d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
												clip-rule="evenodd"
											></path>
										</svg>
									</button>
								</form>
							</td>
							<td class="border border-slate-300 p-3 text-center font-medium">{integrante.apodo}</td
							>
							<td class="border border-slate-300 p-3 text-center">
								<a
									href="/pokemones/{integrante.pokemon.id}"
									class="text-blue-600 hover:text-blue-800 font-medium"
								>
									{integrante.pokemon.nombre}
								</a>
							</td>
							<td class="border border-slate-300 p-3 text-center">
								<img
									src={integrante.pokemon.imagen}
									alt={integrante.pokemon.nombre}
									class="mx-auto h-20 w-20 object-contain rounded-lg transition-transform hover:scale-110"
								/>
							</td>

							<!-- Movimientos en columnas fijas -->
							{#each movimientosFormateados as movimiento, i}
								<td class="border border-slate-300 p-3 text-center">
									{#if movimiento}
										<span class="text-sm font-medium">{movimiento.nombre}</span>
									{:else}
										<span class="text-slate-400 italic text-sm">Sin movimiento</span>
									{/if}
								</td>
								<td class="border border-slate-300 p-3 text-center">
									{#if movimiento}
										<a
											href="/movimientos/{movimiento.id}"
											class="inline-flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors text-white"
											aria-label="Ver detalles de {movimiento.nombre}"
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
										<span class="text-slate-300">-</span>
									{/if}
								</td>
							{/each}
						</tr>
					{:else}
						<tr>
							<td colspan="12" class="border border-slate-300 p-8 text-center text-slate-500">
								No hay integrantes en este equipo
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
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
							<div id="pokemon-nuevo">								<Typeahead
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
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<input type="hidden" name="id_integrante" bind:value={integranteParaMovimiento} />
						<input type="hidden" name="id_movimiento" bind:value={movimientoSeleccionado} />
						<div>
							<label
								for="integrante-movimiento"
								class="block text-sm font-medium text-slate-700 mb-2"
							>
								Integrante <span class="text-red-500">*</span>
							</label>
							<select
								id="integrante-movimiento"
								bind:value={integranteParaMovimiento}
								required
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm"
								onchange={() => {
									movimientoSeleccionado = '';
									mensajeError = '';
								}}
							>
								<option value="">-- Seleccionar --</option>
								{#each data.equipo.integrantes as integrante}
									{@const cantMovimientos = integrante.movimientos?.length || 0}
									<option value={integrante.id} disabled={cantMovimientos >= 4}>
										{integrante.apodo} ({cantMovimientos}/4)
									</option>
								{/each}
							</select>
						</div>

						<div>
							<label for="movimiento-nuevo" class="block text-sm font-medium text-slate-700 mb-2">
								Movimiento <span class="text-red-500">*</span>
							</label>
							<div id="movimiento-nuevo">								<Typeahead
									endpoint="{API_URL}/movimientos/"
									placeholder="Buscar movimiento..."
									disabled={!integranteParaMovimiento}
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
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<input type="hidden" name="id_integrante" bind:value={integranteParaEditar} />
						<div>
							<label for="integrante-editar" class="block text-sm font-medium text-slate-700 mb-2">
								Integrante <span class="text-red-500">*</span>
							</label>
							<select
								id="integrante-editar"
								bind:value={integranteParaEditar}
								required
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
								onchange={() => {
									const integrante = obtenerIntegrantePorId(integranteParaEditar);
									nuevoApodo = integrante?.apodo || '';
								}}
							>
								<option value="">-- Seleccionar --</option>
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
								class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
								placeholder="Nuevo apodo"
							/>
						</div>

						<button
							type="submit"
							disabled={!integranteParaEditar || !nuevoApodo}
							class="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-md transition-colors text-sm"
						>
							Actualizar Apodo
						</button>
					</form>
				{/if}
			</section>
		</div>
	</div>
</div>
