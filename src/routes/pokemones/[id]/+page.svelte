<script>
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onDestroy } from 'svelte';
	
	let { data } = $props();
	let previousId = null;

	// Manejar loading después de cada navegación
	afterNavigate((navigation) => {
		const currentId = $page.params.id;
		
		// Si es la primera carga o cambio de ID, mostrar loading brevemente
		if (previousId !== currentId) {
			showLoading('Cargando info del Pokemon...');
			setTimeout(() => {
				hideLoading();
				previousId = currentId;
			}, 300);
		}
	});

	// Limpiar loading antes de navegar
	beforeNavigate(() => {
		hideLoading();
	});

	// Asegurar que el loading se oculta cuando el componente se destruye
	onDestroy(() => {
		hideLoading();
	});

	const {
		id,
		nombre,
		imagen,
		altura,
		peso,
		generaciones,
		tipos,
		habilidades,
		estadisticas,
		evoluciones,
		movimientos_huevo: movimientosHuevo,
		movimientos_maquina: movimientosMaquina,
		movimientos_nivel: movimientosNivel
	} = $derived(data.pokemon);

	const {
		ataque,
		defensa,
		ataque_especial: ataqueEspecial,
		defensa_especial: defensaEspecial,
		puntos_de_golpe: puntosDeGolpe,
		velocidad
	} = $derived(estadisticas);
	
	function getStatColor(value) {
		if (value >= 100) return '#48b4a8';
		if (value >= 70) return '#e9c46a';
		if (value >= 50) return '#f4a261';
		return '#e76f51';
	}
	
	function verEvolucion(evolucionId) {
		goto(`/pokemones/${evolucionId}`);
	}
</script>

<svelte:head>
	<title>IntroDex | {data.pokemon.nombre}</title>
</svelte:head>

<div class="detail-shell">
	<div class="ui-container">
		<a href="/pokemones" class="back-link">Volver a Pokemon</a>

		<section class="detail-hero ui-card">
			<div class="detail-hero__media">
				<img src={imagen} alt={`Imagen del pokemon ${nombre}`} />
			</div>
			<div class="detail-hero__info">
				<p class="ui-kicker">Perfil tactico</p>
				<h1>{nombre}</h1>
				<div class="detail-hero__types">
					{#each tipos as tipo}
						<EtiquetaTipo tipo={tipo.nombre} tamaño="md" />
					{/each}
				</div>
				<div class="detail-hero__metrics">
					<div>
						<span>Altura</span>
						<strong>{altura}m</strong>
					</div>
					<div>
						<span>Peso</span>
						<strong>{peso}kg</strong>
					</div>
				</div>
			</div>
		</section>

		<div class="detail-grid">
			<section class="detail-card">
				<h2>Estadisticas base</h2>
				<div class="detail-stats">
					{#each [
						{ name: 'HP', value: puntosDeGolpe, key: 'hp' },
						{ name: 'Ataque', value: ataque, key: 'attack' },
						{ name: 'Defensa', value: defensa, key: 'defense' },
						{ name: 'Ataque esp.', value: ataqueEspecial, key: 'sp-attack' },
						{ name: 'Defensa esp.', value: defensaEspecial, key: 'sp-defense' },
						{ name: 'Velocidad', value: velocidad, key: 'speed' }
					] as stat}
						<div class="detail-stat">
							<div class="detail-stat__header">
								<span>{stat.name}</span>
								<strong>{stat.value}</strong>
							</div>
							<div class="ui-bar">
								<span
									style={`width:${Math.min((stat.value / 150) * 100, 100)}%; background:${getStatColor(
										stat.value
									)}`}
								></span>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<section class="detail-card">
				<h2>Habilidades</h2>
				<div class="detail-list">
					{#each habilidades as habilidad}
						<div>
							<h3>{habilidad.nombre}</h3>
							<p>{habilidad.descripcion}</p>
						</div>
					{/each}
				</div>
			</section>
		</div>

		{#if evoluciones && evoluciones.length > 0}
			<section class="detail-card detail-section">
				<div class="detail-section__header">
					<h2>Evoluciones</h2>
					<p>Saltos directos a sus formas conectadas.</p>
				</div>
				<div class="evolution-grid">
					{#each evoluciones as evolucion}
						<button onclick={() => verEvolucion(evolucion.id)} class="evolution-card">
							<img src={evolucion.imagen} alt={evolucion.nombre} />
							<span>{evolucion.nombre}</span>
						</button>
					{/each}
				</div>
			</section>
		{/if}

		<section class="detail-card detail-section">
			<div class="detail-section__header">
				<h2>Tipos y debilidades</h2>
				<p>Visualiza resistencias y puntos de riesgo.</p>
			</div>
			<div class="detail-list">
				{#each tipos as tipo}
					<div class="type-panel">
						<EtiquetaTipo tipo={tipo.nombre} tamaño="md" />
						{#if tipo.debilidades && tipo.debilidades.length > 0}
							<div class="type-panel__weakness">
								<span>Debil contra</span>
								<div>
									{#each tipo.debilidades as debilidad}
										<EtiquetaTipo tipo={debilidad.nombre} tamaño="sm" />
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<section class="detail-card detail-section">
			<div class="detail-section__header">
				<h2>Movimientos disponibles</h2>
				<p>Organizados por metodo de aprendizaje.</p>
			</div>

			{#if movimientosHuevo && movimientosHuevo.length > 0}
				<div class="move-group">
					<h3>Por huevo</h3>
					<div class="move-pill-grid">
						{#each movimientosHuevo as movimiento}
							<a href="/movimientos/{movimiento.id}" class="move-pill">
								<div>
									<span>{movimiento.nombre}</span>
									<div class="move-pill__meta">
										<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
										<span class="ui-pill">{movimiento.categoria}</span>
									</div>
								</div>
								<div class="move-pill__stats">
									<span>{movimiento.potencia || '-'}</span>
									<span>{movimiento.precision || '-'}%</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if movimientosMaquina && movimientosMaquina.length > 0}
				<div class="move-group">
					<h3>Por maquina</h3>
					<div class="move-pill-grid">
						{#each movimientosMaquina as movimiento}
							<a href="/movimientos/{movimiento.id}" class="move-pill">
								<div>
									<span>{movimiento.nombre}</span>
									<div class="move-pill__meta">
										<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
										<span class="ui-pill">{movimiento.categoria}</span>
									</div>
								</div>
								<div class="move-pill__stats">
									<span>{movimiento.potencia || '-'}</span>
									<span>{movimiento.precision || '-'}%</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}

			{#if movimientosNivel && movimientosNivel.length > 0}
				<div class="move-group">
					<h3>Por nivel</h3>
					<div class="move-pill-grid">
						{#each movimientosNivel as movimiento}
							<a href="/movimientos/{movimiento.id}" class="move-pill">
								<div>
									<span>{movimiento.nombre}</span>
									<div class="move-pill__meta">
										<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
										<span class="ui-pill">{movimiento.categoria}</span>
									</div>
								</div>
								<div class="move-pill__stats">
									<span>{movimiento.potencia || '-'}</span>
									<span>{movimiento.precision || '-'}%</span>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</section>
	</div>
</div>