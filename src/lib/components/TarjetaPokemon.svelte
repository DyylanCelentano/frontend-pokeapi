<script lang="ts">
	import { goto } from '$app/navigation';
	import { showLoading } from '$lib/stores/loading.js';
	import EtiquetaTipo from './EtiquetaTipo.svelte';
	import { onMount } from 'svelte';

	let { pokemon } = $props();
	let isVisible = $state(false);
	
	onMount(() => {
		// Trigger animation after mount
		setTimeout(() => {
			isVisible = true;
		}, 50);
	});
	
	function verDetalles() {
		showLoading('Cargando informacion del Pokemon...');
		goto(`/pokemones/${pokemon.id}`);
	}
	
	// Get primary type for accent color
	const primaryType = pokemon.tipos?.[0]?.nombre?.toLowerCase() || 'normal';
	
	// Get stat values from backend structure
	function getStatValue(statName: string) {
		if (!pokemon.estadisticas) return 0;
		const statMapping: Record<string, string> = {
			'hp': 'puntos_de_golpe',
			'attack': 'ataque',
			'defense': 'defensa'
		};
		return pokemon.estadisticas[statMapping[statName]] || 0;
	}
	
	const hp = $derived(getStatValue('hp'));
	const attack = $derived(getStatValue('attack'));
	const defense = $derived(getStatValue('defense'));
</script>

<div
	class="group bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] overflow-hidden card-interactive"
	class:opacity-0={!isVisible}
	class:translate-y-4={!isVisible}
	class:opacity-100={isVisible}
	class:translate-y-0={isVisible}
	style="transition: opacity 0.4s ease-out, transform 0.4s ease-out;"
>
	<!-- Image area with subtle gradient based on type -->
	<div class="relative bg-[var(--color-bg-elevated)] p-6 text-center overflow-hidden">
		<!-- Type-based accent glow -->
		<div 
			class="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
			style="background: radial-gradient(circle at center, var(--tipo-{primaryType}) 0%, transparent 70%);"
		></div>
		
		<img
			src={pokemon.imagen || `/placeholder.svg?height=120&width=120`}
			alt={pokemon.nombre}
			class="w-28 h-28 object-contain mx-auto drop-shadow-lg relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
		/>
		
		<!-- ID Badge -->
		<div class="absolute top-3 right-3 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">
			#{pokemon.id.toString().padStart(3, '0')}
		</div>
	</div>

	<div class="p-4">
		<!-- Name -->
		<h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-3 text-center capitalize group-hover:text-[var(--color-accent)] transition-colors">
			{pokemon.nombre}
		</h3>

		<!-- Types -->
		<div class="flex flex-wrap justify-center gap-2 mb-4">
			{#each pokemon.tipos as tipo}
				<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
			{/each}
		</div>

		<!-- Stats preview with animated bars -->
		<div class="space-y-2.5 mb-4">
			<div class="flex items-center gap-2 text-xs">
				<span class="text-[var(--color-text-muted)] w-8 font-medium">HP</span>
				<div class="flex-1 bg-[var(--color-bg-elevated)] rounded-full h-2 overflow-hidden">
					<div
						class="h-full bg-[var(--color-success)] rounded-full transition-all duration-700 ease-out"
						class:animate-stat-bar={isVisible}
						style="width: {isVisible ? Math.min((hp / 150) * 100, 100) : 0}%"
					></div>
				</div>
				<span class="text-[var(--color-text-secondary)] w-8 text-right font-mono font-medium">{hp}</span>
			</div>
			<div class="flex items-center gap-2 text-xs">
				<span class="text-[var(--color-text-muted)] w-8 font-medium">ATK</span>
				<div class="flex-1 bg-[var(--color-bg-elevated)] rounded-full h-2 overflow-hidden">
					<div
						class="h-full bg-[var(--color-error)] rounded-full transition-all duration-700 ease-out"
						class:animate-stat-bar={isVisible}
						style="width: {isVisible ? Math.min((attack / 150) * 100, 100) : 0}%; animation-delay: 0.1s"
					></div>
				</div>
				<span class="text-[var(--color-text-secondary)] w-8 text-right font-mono font-medium">{attack}</span>
			</div>
			<div class="flex items-center gap-2 text-xs">
				<span class="text-[var(--color-text-muted)] w-8 font-medium">DEF</span>
				<div class="flex-1 bg-[var(--color-bg-elevated)] rounded-full h-2 overflow-hidden">
					<div
						class="h-full bg-[var(--color-accent)] rounded-full transition-all duration-700 ease-out"
						class:animate-stat-bar={isVisible}
						style="width: {isVisible ? Math.min((defense / 150) * 100, 100) : 0}%; animation-delay: 0.2s"
					></div>
				</div>
				<span class="text-[var(--color-text-secondary)] w-8 text-right font-mono font-medium">{defense}</span>
			</div>
		</div>

		<!-- Action button -->
		<button
			onclick={verDetalles}
			class="w-full bg-[var(--color-bg-hover)] hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-white text-center py-2.5 px-4 rounded-lg font-medium transition-all duration-300 text-sm flex items-center justify-center gap-2 group/btn"
		>
			<span>Ver detalles</span>
			<svg class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9,18 15,12 9,6"/>
			</svg>
		</button>
	</div>
</div>
