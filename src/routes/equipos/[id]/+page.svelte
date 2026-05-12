<script>
	import EmptyState from '$lib/components/EmptyState.svelte';
	import Typeahead from '$lib/components/Typeahead.svelte';
	import { API_URL } from '$lib/constantes/index';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';

	let { data } = $props();

	// Form variables
	let idPokemonNuevo = $state('');
	let apodoNuevo = $state('');
	let integranteParaMovimiento = $state('');
	let movimientoSeleccionado = $state('');
	let integranteParaEditar = $state('');
	let nuevoApodo = $state('');

	// Status messages
	let mensajeError = $state('');
	let mensajeExito = $state('');

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
			mensajeError = 'Este equipo ya tiene el maximo de 6 integrantes.';
			return false;
		}
		return true;
	}

	function validarLimiteMovimientos(integrante) {
		if (integrante.movimientos && integrante.movimientos.length >= 4) {
			mensajeError = `${integrante.apodo} ya tiene el maximo de 4 movimientos.`;
			return false;
		}
		return true;
	}

	function obtenerIntegrantePorId(id) {
		return data.equipo.integrantes.find((i) => i.id == id);
	}

	function obtenerMovimientosFormateados(integrante) {
		const movimientos = integrante.movimientos || [];
		const resultado = [null, null, null, null];
		for (let i = 0; i < Math.min(movimientos.length, 4); i++) {
			resultado[i] = movimientos[i];
		}
		return resultado;
	}

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
			mensajeError = 'Debe seleccionar un integrante valido.';
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
	<title>{data.equipo.nombre} - Equipos - IntroDex</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg-primary)] py-8">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<a
			href="/equipos"
			class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6 text-sm"
		>
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15,18 9,12 15,6"/>
			</svg>
			Volver a Equipos
		</a>

		<!-- Team header -->
		<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
			<div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
				<div class="flex-1">
					<h1 class="text-2xl font-bold text-[var(--color-text-primary)] mb-2">{data.equipo.nombre}</h1>
					<div class="flex items-center gap-4 text-sm text-[var(--color-text-muted)]">
						<span class="flex items-center gap-1">
							<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<circle cx="12" cy="12" r="10"/>
							</svg>
							Generacion {data.equipo.generacion.numero}
						</span>
						<span class="flex items-center gap-1">
							<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
								<circle cx="9" cy="7" r="4"/>
							</svg>
							{data.equipo.integrantes.length}/6 integrantes
						</span>
					</div>
				</div>
				
				<!-- Progress bar -->
				<div class="w-full lg:w-64">
					<div class="flex justify-between text-xs text-[var(--color-text-muted)] mb-2">
						<span>Progreso del equipo</span>
						<span>{data.equipo.integrantes.length}/6</span>
					</div>
					<div class="w-full bg-[var(--color-bg-elevated)] rounded-full h-2">
						<div 
							class="bg-[var(--color-accent)] h-2 rounded-full transition-all duration-500"
							style="width: {(data.equipo.integrantes.length / 6) * 100}%"
						></div>
					</div>
				</div>
			</div>
		</div>

		<!-- Status messages -->
		{#if mensajeError}
			<div class="bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 text-[var(--color-error)] px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="8" x2="12" y2="12"/>
					<line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
				{mensajeError}
			</div>
		{/if}

		{#if mensajeExito}
			<div class="bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 text-[var(--color-success)] px-4 py-3 rounded-lg mb-6 flex items-center gap-2 text-sm">
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="20,6 9,17 4,12"/>
				</svg>
				{mensajeExito}
			</div>
		{/if}

		<h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6">
			Integrantes de {data.equipo.nombre}
			<span class="text-sm font-normal text-[var(--color-text-muted)]">({data.equipo.integrantes.length}/6)</span>
		</h3>

		{#if data.equipo.integrantes.length === 0}
			<EmptyState
				title="Sin integrantes"
				message="Este equipo aun no tiene integrantes. Comienza agregando tu primer Pokemon!"
				suggestions={[
					"Usa el formulario de abajo para agregar un nuevo integrante",
					"Cada equipo puede tener hasta 6 integrantes",
					"Cada integrante puede aprender hasta 4 movimientos"
				]}
			/>
		{:else}
			<!-- Team members grid -->
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
				{#each data.equipo.integrantes as integrante}
					{@const movimientosFormateados = obtenerMovimientosFormateados(integrante)}
					<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-border-focus)] transition-colors">
						<!-- Header -->
						<div class="p-4 border-b border-[var(--color-border)]">
							<div class="flex items-start justify-between">
								<div class="flex-1">
									<h4 class="text-base font-semibold text-[var(--color-text-primary)] mb-1">
										{integrante.apodo}
									</h4>
									<a
										href="/pokemones/{integrante.pokemon.id}"
										class="text-[var(--color-accent)] hover:underline text-sm"
									>
										{integrante.pokemon.nombre}
									</a>
								</div>
								<div class="flex items-center gap-2">
									<img
										src={integrante.pokemon.imagen}
										alt={integrante.pokemon.nombre}
										class="w-14 h-14 object-contain rounded-lg bg-[var(--color-bg-elevated)]"
									/>
									<form action="?/eliminar_integrante" method="POST" onsubmit={manejarEliminarIntegrante}>
										<input type="hidden" name="integrante_id" value={integrante.id} />
										<input type="hidden" name="id_equipo" value={data.equipo.id} />
										<button
											class="text-[var(--color-error)] hover:bg-[var(--color-error)]/10 p-2 rounded-lg transition-colors"
											title="Eliminar {integrante.apodo}"
										>
											<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="3,6 5,6 21,6"/>
												<path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
											</svg>
										</button>
									</form>
								</div>
							</div>
						</div>
						
						<!-- Moves -->
						<div class="p-4">
							<h5 class="text-xs font-medium text-[var(--color-text-muted)] mb-3 uppercase tracking-wider">Movimientos ({integrante.movimientos.length}/4)</h5>
							<div class="grid grid-cols-2 gap-2">
								{#each movimientosFormateados as movimiento, i}
									<div class="flex items-center justify-between p-2.5 bg-[var(--color-bg-elevated)] rounded-lg">
										{#if movimiento}
											<span class="text-sm text-[var(--color-text-secondary)] truncate">{movimiento.nombre}</span>
											<a
												href="/movimientos/{movimiento.id}"
												class="w-7 h-7 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors text-white flex items-center justify-center flex-shrink-0 ml-2"
												title="Ver {movimiento.nombre}"
											>
												<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
													<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
													<circle cx="12" cy="12" r="3"/>
												</svg>
											</a>
										{:else}
											<span class="text-[var(--color-text-muted)] text-sm italic">Espacio libre</span>
											<div class="w-7 h-7 bg-[var(--color-bg-primary)] rounded-md flex items-center justify-center">
												<span class="text-[var(--color-text-muted)] text-xs">+</span>
											</div>
										{/if}
									</div>
								{/each}
							</div>
							
							<!-- Moves progress -->
							<div class="mt-3">
								<div class="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
									<span>Movimientos</span>
									<span>{integrante.movimientos.length}/4</span>
								</div>
								<div class="w-full bg-[var(--color-bg-primary)] rounded-full h-1">
									<div class="bg-[var(--color-success)] h-1 rounded-full transition-all duration-300" style="width: {(integrante.movimientos.length / 4) * 100}%"></div>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<!-- Forms grid -->
		<div class="grid md:grid-cols-3 gap-4 mt-8">
			<!-- 1. Create member form -->
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
				<h2 class="text-base font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
					<span class="w-6 h-6 bg-[var(--color-accent)] text-white rounded-full flex items-center justify-center text-xs">1</span>
					Crear Integrante
				</h2>

				{#if data.equipo.integrantes.length >= 6}
					<div class="bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30 text-[var(--color-warning)] px-3 py-2 rounded-lg text-sm">
						Equipo completo (6/6)
					</div>
				{:else}
					<form action="?/agregar_integrante" method="POST" class="space-y-3" onsubmit={manejarEnvioCrearIntegrante}>
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<input type="hidden" name="id_pokemon" bind:value={idPokemonNuevo} />
						<div>
							<label for="pokemon-nuevo" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Pokemon</label>
							<Typeahead
								endpoint="{API_URL}/pokemon/"
								placeholder="Buscar Pokemon..."
								on:select={(event) => {
									idPokemonNuevo = event.detail.result.id;
									mensajeError = '';
								}}
							/>
						</div>
						<div>
							<label for="apodo-nuevo" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Apodo</label>
							<input
								id="apodo-nuevo"
								type="text"
								name="apodo"
								bind:value={apodoNuevo}
								required
								maxlength="50"
								class="w-full px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
								placeholder="Apodo del integrante"
							/>
						</div>
						<button
							type="submit"
							disabled={!idPokemonNuevo || !apodoNuevo}
							class="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-[var(--color-bg-hover)] disabled:text-[var(--color-text-muted)] disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
						>
							Agregar Integrante
						</button>
					</form>
				{/if}
			</div>

			<!-- 2. Add move form -->
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
				<h2 class="text-base font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
					<span class="w-6 h-6 bg-[var(--color-success)] text-white rounded-full flex items-center justify-center text-xs">2</span>
					Agregar Movimiento
				</h2>

				{#if data.equipo.integrantes.length === 0}
					<div class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] px-3 py-2 rounded-lg text-sm">
						Sin integrantes en el equipo
					</div>
				{:else}
					<form action="?/agregar_movimiento" method="POST" class="space-y-3" onsubmit={manejarEnvioAgregarMovimiento}>
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<input type="hidden" name="id_movimiento" bind:value={movimientoSeleccionado} />
						<div>
							<label for="integrante-movimiento" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Integrante</label>
							<select
								id="integrante-movimiento"
								name="id_integrante"
								bind:value={integranteParaMovimiento}
								required
								class="w-full px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-success)] focus:ring-2 focus:ring-[var(--color-success)]/20 transition-all"
							>
								<option value="">Selecciona un integrante</option>
								{#each data.equipo.integrantes as integrante}
									<option value={integrante.id}>{integrante.apodo} - {integrante.pokemon.nombre}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="movimiento" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Movimiento</label>
							<Typeahead
								endpoint="{API_URL}/movimientos/"
								placeholder="Buscar movimiento..."
								on:select={(event) => {
									movimientoSeleccionado = event.detail.result.id;
									mensajeError = '';
								}}
							/>
						</div>
						<button
							type="submit"
							disabled={!integranteParaMovimiento || !movimientoSeleccionado}
							class="w-full bg-[var(--color-success)] hover:bg-[var(--color-success)]/80 disabled:bg-[var(--color-bg-hover)] disabled:text-[var(--color-text-muted)] disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
						>
							Agregar Movimiento
						</button>
					</form>
				{/if}
			</div>

			<!-- 3. Edit member form -->
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5">
				<h2 class="text-base font-semibold text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
					<span class="w-6 h-6 bg-[var(--tipo-dragon)] text-white rounded-full flex items-center justify-center text-xs">3</span>
					Editar Integrante
				</h2>

				{#if data.equipo.integrantes.length === 0}
					<div class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-muted)] px-3 py-2 rounded-lg text-sm">
						Sin integrantes en el equipo
					</div>
				{:else}
					<form action="?/editar_integrante" method="POST" class="space-y-3" onsubmit={manejarEnvioEditarIntegrante}>
						<input type="hidden" name="id_equipo" value={data.equipo.id} />
						<div>
							<label for="integrante-editar" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Integrante</label>
							<select
								id="integrante-editar"
								name="id_integrante"
								bind:value={integranteParaEditar}
								required
								class="w-full px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--tipo-dragon)] focus:ring-2 focus:ring-[var(--tipo-dragon)]/20 transition-all"
							>
								<option value="">Selecciona un integrante</option>
								{#each data.equipo.integrantes as integrante}
									<option value={integrante.id}>{integrante.apodo} - {integrante.pokemon.nombre}</option>
								{/each}
							</select>
						</div>
						<div>
							<label for="nuevo-apodo-editar" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5">Nuevo apodo</label>
							<input
								id="nuevo-apodo-editar"
								type="text"
								name="apodo"
								bind:value={nuevoApodo}
								required
								maxlength="50"
								class="w-full px-3 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--tipo-dragon)] focus:ring-2 focus:ring-[var(--tipo-dragon)]/20 transition-all"
								placeholder="Nuevo apodo"
							/>
						</div>
						<button
							type="submit"
							disabled={!integranteParaEditar || !nuevoApodo}
							class="w-full bg-[var(--tipo-dragon)] hover:bg-[var(--tipo-dragon)]/80 disabled:bg-[var(--color-bg-hover)] disabled:text-[var(--color-text-muted)] disabled:cursor-not-allowed text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
						>
							Editar Integrante
						</button>
					</form>
				{/if}
			</div>
		</div>
	</div>
</div>
