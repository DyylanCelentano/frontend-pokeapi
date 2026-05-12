<script>
	import { goto } from '$app/navigation';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onMount } from 'svelte';
	
	let { data } = $props();
	
	onMount(() => {
		showLoading('Cargando informacion del movimiento...');
		setTimeout(() => {
			hideLoading();
		}, 600);
	});
	
	function getCategoryIcon(category) {
		const icons = {
			'Fisico': 'fist',
			'Especial': 'sparkle',
			'Estado': 'refresh'
		};
		return icons[category] || 'help';
	}
	
	function verPokemon(pokemonId) {
		showLoading('Cargando informacion del Pokemon...');
		goto(`/pokemones/${pokemonId}`);
	}
</script>

<svelte:head>
	<title>{data.movimiento.nombre} - Movimientos - IntroDex</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg-primary)]">
	<!-- Header -->
	<div class="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<a
				href="/movimientos"
				class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15,18 9,12 15,6"/>
				</svg>
				Volver a Movimientos
			</a>
		</div>
	</div>

	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Main Move Card -->
		<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden mb-8">
			<div class="p-8">
				<div class="text-center">
					<h1 class="text-4xl font-bold text-[var(--color-text-primary)] mb-4">{data.movimiento.nombre}</h1>
					<div class="flex flex-wrap gap-3 justify-center mb-6">
						<EtiquetaTipo tipo={data.movimiento.tipo.nombre} tamaño="lg" />
						<span class="px-4 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)] rounded-lg font-medium text-sm">
							{data.movimiento.categoria}
						</span>
					</div>
					{#if data.movimiento.efecto}
						<p class="text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">{data.movimiento.efecto}</p>
					{/if}
				</div>
			</div>
		</div>

		<!-- Stats Grid -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 text-center">
				<div class="text-2xl font-bold text-[var(--color-error)] mb-1">{data.movimiento.potencia || '-'}</div>
				<div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Potencia</div>
			</div>
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 text-center">
				<div class="text-2xl font-bold text-[var(--color-accent)] mb-1">{data.movimiento.precision || '-'}%</div>
				<div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Precision</div>
			</div>
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 text-center">
				<div class="text-2xl font-bold text-[var(--color-success)] mb-1">{data.movimiento.puntos_de_poder}</div>
				<div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">PP</div>
			</div>
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 text-center">
				<div class="text-lg font-bold text-[var(--tipo-dragon)] mb-1">{data.movimiento.generacion.nombre}</div>
				<div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Generacion</div>
			</div>
		</div>

		<!-- Pokemon that learn this move -->
		
		<!-- By Egg -->
		{#if data.movimiento.pokemon_por_huevo && data.movimiento.pokemon_por_huevo.length > 0}
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-6">
				<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<ellipse cx="12" cy="12" rx="8" ry="10"/>
					</svg>
					Pokemon que aprenden por Huevo
				</h2>
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
					{#each data.movimiento.pokemon_por_huevo as pokemon}
						<button
							onclick={() => verPokemon(pokemon.id)}
							class="group bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-3 hover:border-[var(--color-border-focus)] hover:shadow-lg transition-all duration-200"
						>
							<img 
								src={pokemon.imagen} 
								alt={pokemon.nombre}
								class="w-16 h-16 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<h3 class="font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] capitalize text-sm text-center transition-colors">{pokemon.nombre}</h3>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- By Machine -->
		{#if data.movimiento.pokemon_por_maquina && data.movimiento.pokemon_por_maquina.length > 0}
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-6">
				<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
						<circle cx="12" cy="12" r="4"/>
					</svg>
					Pokemon que aprenden por Maquina
				</h2>
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
					{#each data.movimiento.pokemon_por_maquina as pokemon}
						<button
							onclick={() => verPokemon(pokemon.id)}
							class="group bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-3 hover:border-[var(--color-border-focus)] hover:shadow-lg transition-all duration-200"
						>
							<img 
								src={pokemon.imagen} 
								alt={pokemon.nombre}
								class="w-16 h-16 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<h3 class="font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] capitalize text-sm text-center transition-colors">{pokemon.nombre}</h3>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- By Level -->
		{#if data.movimiento.pokemon_por_nivel && data.movimiento.pokemon_por_nivel.length > 0}
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
				<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
						<polyline points="17,6 23,6 23,12"/>
					</svg>
					Pokemon que aprenden por Nivel
				</h2>
				<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
					{#each data.movimiento.pokemon_por_nivel as pokemon}
						<button
							onclick={() => verPokemon(pokemon.id)}
							class="group bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-3 hover:border-[var(--color-border-focus)] hover:shadow-lg transition-all duration-200"
						>
							<img 
								src={pokemon.imagen} 
								alt={pokemon.nombre}
								class="w-16 h-16 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<h3 class="font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] capitalize text-sm text-center transition-colors">{pokemon.nombre}</h3>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
