<script>
	import { goto } from '$app/navigation';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onMount } from 'svelte';
	
	let { data } = $props();
	
	// Mostrar loading al cargar la página
	onMount(() => {
		showLoading('Cargando info del movimiento...');
		setTimeout(() => {
			hideLoading();
		}, 600);
	});
	

	
	function verPokemon(pokemonId) {
		showLoading('Cargando info del Pokemon...');
		goto(`/pokemones/${pokemonId}`);
	}
</script>

<svelte:head>
	<title>IntroDex | {data.movimiento.nombre}</title>
</svelte:head>

<div class="detail-shell">
	<div class="ui-container">
		<a href="/movimientos" class="back-link">Volver a movimientos</a>

		<section class="move-detail-hero ui-card">
			<div>
				<p class="ui-kicker">Movimiento</p>
				<h1>{data.movimiento.nombre}</h1>
				<p class="ui-subtitle">{data.movimiento.efecto}</p>
			</div>
			<div class="move-detail-hero__tags">
				<EtiquetaTipo tipo={data.movimiento.tipo.nombre} tamaño="md" />
				<span class="ui-tag">{data.movimiento.categoria}</span>
			</div>
			<div class="move-detail-hero__stats">
				<div>
					<span>Potencia</span>
					<strong>{data.movimiento.potencia || '—'}</strong>
				</div>
				<div>
					<span>Precision</span>
					<strong>{data.movimiento.precision || '—'}%</strong>
				</div>
				<div>
					<span>PP</span>
					<strong>{data.movimiento.puntos_de_poder}</strong>
				</div>
				<div>
					<span>Generacion</span>
					<strong>{data.movimiento.generacion.nombre}</strong>
				</div>
			</div>
		</section>

		{#if data.movimiento.pokemon_por_huevo && data.movimiento.pokemon_por_huevo.length > 0}
			<section class="detail-card detail-section">
				<div class="detail-section__header">
					<h2>Aprenden por huevo</h2>
					<p>Lista de Pokemon compatibles por herencia.</p>
				</div>
				<div class="learn-grid">
					{#each data.movimiento.pokemon_por_huevo as pokemon}
						<button onclick={() => verPokemon(pokemon.id)} class="learn-card">
							<img src={pokemon.imagen} alt={pokemon.nombre} />
							<h3>{pokemon.nombre}</h3>
							<p>Altura {pokemon.altura}m · Peso {pokemon.peso}kg</p>
						</button>
					{/each}
				</div>
			</section>
		{/if}

		{#if data.movimiento.pokemon_por_maquina && data.movimiento.pokemon_por_maquina.length > 0}
			<section class="detail-card detail-section">
				<div class="detail-section__header">
					<h2>Aprenden por maquina</h2>
					<p>Compatibles con MT o MO segun la generacion.</p>
				</div>
				<div class="learn-grid">
					{#each data.movimiento.pokemon_por_maquina as pokemon}
						<button onclick={() => verPokemon(pokemon.id)} class="learn-card">
							<img src={pokemon.imagen} alt={pokemon.nombre} />
							<h3>{pokemon.nombre}</h3>
							<p>Altura {pokemon.altura}m · Peso {pokemon.peso}kg</p>
						</button>
					{/each}
				</div>
			</section>
		{/if}

		{#if data.movimiento.pokemon_por_nivel && data.movimiento.pokemon_por_nivel.length > 0}
			<section class="detail-card detail-section">
				<div class="detail-section__header">
					<h2>Aprenden por nivel</h2>
					<p>Registro de aprendizaje natural por experiencia.</p>
				</div>
				<div class="learn-grid">
					{#each data.movimiento.pokemon_por_nivel as pokemon}
						<button onclick={() => verPokemon(pokemon.id)} class="learn-card">
							<img src={pokemon.imagen} alt={pokemon.nombre} />
							<h3>{pokemon.nombre}</h3>
							<p>Altura {pokemon.altura}m · Peso {pokemon.peso}kg</p>
						</button>
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>
