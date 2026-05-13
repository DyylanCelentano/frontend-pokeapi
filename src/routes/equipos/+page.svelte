<script>
	import { enhance } from '$app/forms';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	export let data;

	let search = '';
	let exito = false;

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

<svelte:head>
	<title>IntroDex | Equipos</title>
</svelte:head>

<div class="page-shell">
	<main class="app-main">
		<section class="ui-section">
			<div class="ui-container">
				<a href="../" class="back-link">Volver al inicio</a>
				<div class="page-header">
					<div>
						<p class="ui-kicker">Equipos</p>
						<h1>Equipos en serio</h1>
						<p class="ui-subtitle">Crea, ordena y ajusta tu plantel sin vueltas.</p>
					</div>
				</div>

				<div class="team-form ui-surface">
					<h2>Armar equipo</h2>
					<p>Elegi una generacion y ponele un nombre claro.</p>
					<form
						method="POST"
						action="?/create"
						class="team-form__fields"
						use:enhance={() => {
							mostrarBannerEquipoCreado();
						}}
					>
						<label>
							<span>Nombre</span>
							<input
								name="nombre"
								autocomplete="off"
								required
								class="ui-input"
							/>
						</label>
						<label>
							<span>Generacion</span>
							<select name="id_generacion" required class="ui-select">
								<option value="">Seleccionar</option>
								<option value="1">Generacion I</option>
								<option value="2">Generacion II</option>
								<option value="3">Generacion III</option>
								<option value="4">Generacion IV</option>
								<option value="5">Generacion V</option>
								<option value="6">Generacion VI</option>
								<option value="7">Generacion VII</option>
								<option value="8">Generacion VIII</option>
							</select>
						</label>
						<button type="submit" class="ui-button primary">Guardar</button>
					</form>
					{#if exito}
						<div class="banner success">Equipo creado, de una</div>
					{/if}
				</div>

				<div class="results-header">
					<input
						type="text"
						placeholder="Buscar equipo por nombre"
						bind:value={search}
						class="ui-input team-search"
					/>
					<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
				</div>

				<div class="ui-grid ui-grid-3 team-grid">
					{#each equiposFiltrados as equipo}
						<div class="team-card ui-card">
							<div class="team-card__header">
								<div>
									<h3>{equipo.nombre}</h3>
									<span class="ui-pill">{equipo.generacion.nombre}</span>
								</div>
								<span class="ui-tag">{equipo.cantidad_integrantes}/6</span>
							</div>
							<div class="team-card__stats">
								<div>
									<span>Integrantes</span>
									<strong>{equipo.cantidad_integrantes}</strong>
								</div>
								<div>
									<span>Espacios</span>
									<strong>{6 - equipo.cantidad_integrantes}</strong>
								</div>
							</div>
							<div class="ui-bar">
								<span style={`width:${(equipo.cantidad_integrantes / 6) * 100}%`}></span>
							</div>
							<div class="team-card__actions">
								<a href={`/equipos/${equipo.id}`} class="ui-button soft">Ver equipo</a>
								<form action="?/eliminar_equipo" method="POST" use:enhance={() => {}}>
									<input type="hidden" name="id_equipo" value={equipo.id} />
									<button type="submit" class="ui-button ghost">Eliminar</button>
								</form>
							</div>
						</div>
					{:else}
						<div class="col-span-full">
							<EmptyState
								title="Sin equipos todavia"
								message="Crea el primero y aparece aca al toque."
								suggestions={[
									"Usa el formulario de arriba para crear uno",
									"Si estas filtrando, revisa la ortografia",
									"Cada equipo admite hasta 6 integrantes"
								]}
							/>
						</div>
					{/each}
				</div>
			</div>
		</section>
	</main>
</div>
