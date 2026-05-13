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
	let panelActivo = $state('integrante');

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
			mensajeError = 'Este equipo ya tiene 6 integrantes.';
			return false;
		}
		return true;
	}

	function validarLimiteMovimientos(integrante) {
		if (integrante.movimientos && integrante.movimientos.length >= 4) {
			mensajeError = `${integrante.apodo} ya tiene 4 movimientos.`;
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
		showLoading('Sumando integrante...');
		setTimeout(() => {
			limpiarFormularioNuevoIntegrante();
			mensajeExito = 'Integrante agregado.';
			hideLoading();
		}, 100);
		return true;
	}

	function manejarEnvioAgregarMovimiento() {
		const integrante = obtenerIntegrantePorId(integranteParaMovimiento);
		if (!integrante) {
			mensajeError = 'Selecciona un integrante valido.';
			return false;
		}

		if (!validarLimiteMovimientos(integrante)) return false;

		if (tieneMovimientoDuplicado(integrante, movimientoSeleccionado)) {
			mensajeError = 'Ese movimiento ya esta cargado.';
			return false;
		}

		showLoading('Sumando movimiento...');
		setTimeout(() => {
			limpiarFormularioMovimiento();
			mensajeExito = 'Movimiento agregado.';
			hideLoading();
		}, 100);
		return true;
	}

	function manejarEnvioEditarIntegrante() {
		if (!integranteParaEditar) {
			mensajeError = 'Selecciona un integrante para editar.';
			return false;
		}

		showLoading('Actualizando integrante...');
		setTimeout(() => {
			limpiarFormularioEdicion();
			mensajeExito = 'Integrante actualizado.';
			hideLoading();
		}, 100);
		return true;
	}

	function manejarEliminarIntegrante() {
		showLoading('Sacando integrante...');
		return true;
	}
</script>

<svelte:head>
	<title>IntroDex | {data.equipo.nombre}</title>
</svelte:head>

<div class="page-shell">
	<div class="ui-container">
		<a href="../" class="back-link">Volver a equipos</a>

		<div class="detail-card team-detail-hero">
			<div>
				<h1>{data.equipo.nombre}</h1>
				<p class="ui-subtitle">Generacion {data.equipo.generacion.numero} · {data.equipo.integrantes.length}/6 integrantes</p>
			</div>
			<div class="team-detail-progress">
				<div class="team-detail-progress__header">
					<span>Progreso del equipo</span>
					<span>{data.equipo.integrantes.length}/6</span>
				</div>
				<div class="ui-bar">
					<span style={`width:${(data.equipo.integrantes.length / 6) * 100}%`}></span>
				</div>
			</div>
		</div>

		{#if mensajeError}
			<div class="banner error">{mensajeError}</div>
		{/if}

		{#if mensajeExito}
			<div class="banner success">{mensajeExito}</div>
		{/if}

		<h3 class="section-title">Integrantes ({data.equipo.integrantes.length}/6)</h3>

		{#if data.equipo.integrantes.length === 0}
			<EmptyState
				title="Sin integrantes"
				message="Este equipo todavia no tiene integrantes."
				suggestions={[
					"Usa el panel de abajo para sumar uno",
					"Cada equipo admite hasta 6 integrantes",
					"Cada integrante puede aprender hasta 4 movimientos"
				]}
			/>
		{:else}
			<div class="team-member-grid">
				{#each data.equipo.integrantes as integrante}
					{@const movimientosFormateados = obtenerMovimientosFormateados(integrante)}
					<div class="team-member-card">
						<div class="team-member-card__header">
							<div>
								<h4>{integrante.apodo}</h4>
								<a href="/pokemones/{integrante.pokemon.id}">{integrante.pokemon.nombre}</a>
							</div>
							<div class="team-member-card__media">
								<img src={integrante.pokemon.imagen} alt={integrante.pokemon.nombre} />
								<form action="?/eliminar_integrante" method="POST" onsubmit={manejarEliminarIntegrante}>
									<input type="hidden" name="integrante_id" value={integrante.id} />
									<input type="hidden" name="id_equipo" value={data.equipo.id} />
									<button class="ui-button ghost" type="submit">Eliminar</button>
								</form>
							</div>
						</div>
						<div class="team-member-card__body">
							<h5>Movimientos ({integrante.movimientos.length}/4)</h5>
							<div class="team-member-moves">
								{#each movimientosFormateados as movimiento}
									<div class="team-member-move">
										{#if movimiento}
											<span>{movimiento.nombre}</span>
											<a href="/movimientos/{movimiento.id}">Ver</a>
										{:else}
											<span class="empty-slot">Espacio libre</span>
										{/if}
									</div>
								{/each}
							</div>
							<div class="team-member-progress">
								<div>
									<span>Movimientos aprendidos</span>
									<span>{integrante.movimientos.length}/4</span>
								</div>
								<div class="ui-bar">
									<span style={`width:${(integrante.movimientos.length / 4) * 100}%`}></span>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<section class="manage-panel">
			<div class="manage-panel__tabs">
				<button
					onclick={() => (panelActivo = 'integrante')}
					class:active={panelActivo === 'integrante'}
				>
					Agregar integrante
				</button>
				<button
					onclick={() => (panelActivo = 'movimiento')}
					class:active={panelActivo === 'movimiento'}
				>
					Agregar movimiento
				</button>
				<button
					onclick={() => (panelActivo = 'editar')}
					class:active={panelActivo === 'editar'}
				>
					Editar integrante
				</button>
			</div>

			<div class="manage-panel__body">
				{#if panelActivo === 'integrante'}
					<h2>Sumar integrante</h2>
					<p>Elegi un Pokemon y ponele un apodo con onda.</p>
					{#if data.equipo.integrantes.length >= 6}
						<div class="banner warning">
							Equipo completo (6/6). Libera un lugar y seguimos.
						</div>
					{:else}
						<form
							action="?/agregar_integrante"
							method="POST"
							class="form-stack"
							onsubmit={manejarEnvioCrearIntegrante}
						>
							<input type="hidden" name="id_equipo" value={data.equipo.id} />
							<input type="hidden" name="id_pokemon" bind:value={idPokemonNuevo} />
							<div>
								<label for="pokemon-nuevo">Pokemon</label>
								<div id="pokemon-nuevo">
									<Typeahead
										endpoint={`${API_URL}/pokemon/`}
										placeholder="Buscar Pokemon..."
										on:select={(event) => {
											idPokemonNuevo = event.detail.result.id;
											mensajeError = '';
										}}
									/>
								</div>
							</div>
							<div>
								<label for="apodo-nuevo">Apodo</label>
								<input
									id="apodo-nuevo"
									type="text"
									name="apodo"
									bind:value={apodoNuevo}
									required
									maxlength="50"
									class="ui-input"
									placeholder="Ej: La fiera"
								/>
							</div>
							<button
								type="submit"
								disabled={!idPokemonNuevo || !apodoNuevo}
								class="ui-button primary"
							>
								Agregar integrante
							</button>
						</form>
					{/if}
				{:else if panelActivo === 'movimiento'}
					<h2>Cargar movimiento</h2>
					<p>Elegi un integrante y sumale un movimiento clave.</p>
					{#if data.equipo.integrantes.length === 0}
						<div class="manage-empty">Sin integrantes en el equipo</div>
					{:else}
						<form
							action="?/agregar_movimiento"
							method="POST"
							class="form-stack"
							onsubmit={manejarEnvioAgregarMovimiento}
						>
							<input type="hidden" name="id_equipo" value={data.equipo.id} />
							<input type="hidden" name="id_movimiento" bind:value={movimientoSeleccionado} />
							<div>
								<label for="integrante-movimiento">Integrante</label>
								<select
									id="integrante-movimiento"
									name="id_integrante"
									bind:value={integranteParaMovimiento}
									required
									class="ui-select"
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
								<label for="movimiento">Movimiento</label>
								<div id="movimiento">
									<Typeahead
										endpoint={`${API_URL}/movimientos/`}
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
								class="ui-button primary"
							>
								Agregar movimiento
							</button>
						</form>
					{/if}
				{:else}
					<h2>Editar integrante</h2>
					<p>Si queres cambiar el apodo, hacelo aca.</p>
					{#if data.equipo.integrantes.length === 0}
						<div class="manage-empty">Sin integrantes en el equipo</div>
					{:else}
						<form
							action="?/editar_integrante"
							method="POST"
							class="form-stack"
							onsubmit={manejarEnvioEditarIntegrante}
						>
							<input type="hidden" name="id_equipo" value={data.equipo.id} />
							<div>
								<label for="integrante-editar">Integrante</label>
								<select
									id="integrante-editar"
									name="id_integrante"
									bind:value={integranteParaEditar}
									required
									class="ui-select"
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
								<label for="nuevo-apodo-editar">Nuevo apodo</label>
								<input
									id="nuevo-apodo-editar"
									type="text"
									name="apodo"
									bind:value={nuevoApodo}
									required
									maxlength="50"
									class="ui-input"
									placeholder="Ej: El jefe"
								/>
							</div>
							<button
								type="submit"
								disabled={!integranteParaEditar || !nuevoApodo}
								class="ui-button primary"
							>
								Editar integrante
							</button>
						</form>
					{/if}
				{/if}
			</div>
		</section>
	</div>
</div>
