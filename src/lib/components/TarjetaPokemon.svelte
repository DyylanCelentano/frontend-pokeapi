<script lang="ts">
	import { goto } from '$app/navigation';
	import { showLoading } from '$lib/stores/loading.js';
	import EtiquetaTipo from './EtiquetaTipo.svelte';

	let { pokemon } = $props();
	
	function verDetalles() {
		showLoading('Cargando informacion del Pokemon...');
		goto(`/pokemones/${pokemon.id}`);
	}
	
	// Get primary type for accent color
	const primaryType = pokemon.tipos?.[0]?.nombre?.toLowerCase() || 'normal';
</script>

<div
	class="group bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)] overflow-hidden transition-all duration-300 hover:border-[var(--color-border-focus)] hover:shadow-lg hover:-translate-y-1"
>
	<!-- Image area with subtle gradient based on type -->
	<div class="relative bg-[var(--color-bg-elevated)] p-6 text-center">
		<!-- Type-based accent glow -->
		<div class="absolute inset-0 opacity-20 bg-gradient-to-br from-[var(--tipo-{primaryType})] to-transparent"></div>
		
		<img
			src={pokemon.imagen || `/placeholder.svg?height=120&width=120`}
			alt={pokemon.nombre}
			class="w-28 h-28 object-contain mx-auto drop-shadow-lg relative z-10 transition-transform duration-300 group-hover:scale-110"
		/>
		
		<!-- ID Badge -->
		<div class="absolute top-3 right-3 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-mono text-[var(--color-text-muted)]">
			#{pokemon.id.toString().padStart(3, '0')}
		</div>
	</div>

	<div class="p-4">
		<!-- Name -->
		<h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-3 text-center capitalize">
			{pokemon.nombre}
		</h3>

		<!-- Types -->
		<div class="flex flex-wrap justify-center gap-2 mb-4">
			{#each pokemon.tipos as tipo}
				<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
			{/each}
		</div>

		<!-- Stats preview -->
		<div class="space-y-2 mb-4">
			<div class="flex items-center gap-2 text-xs">
				<span class="text-[var(--color-text-muted)] w-8">HP</span>
				<div class="flex-1 bg-[var(--color-bg-elevated)] rounded-full h-1.5 overflow-hidden">
					<div
						class="h-full bg-[var(--color-success)] rounded-full transition-all duration-500"
						style="width: {Math.min((pokemon.estadisticas?.vida || 0) / 255 * 100, 100)}%"
					></div>
				</div>
				<span class="text-[var(--color-text-secondary)] w-8 text-right font-mono">{pokemon.estadisticas?.vida || 0}</span>
			</div>
			<div class="flex items-center gap-2 text-xs">
				<span class="text-[var(--color-text-muted)] w-8">ATK</span>
				<div class="flex-1 bg-[var(--color-bg-elevated)] rounded-full h-1.5 overflow-hidden">
					<div
						class="h-full bg-[var(--color-error)] rounded-full transition-all duration-500"
						style="width: {Math.min((pokemon.estadisticas?.ataque || 0) / 255 * 100, 100)}%"
					></div>
				</div>
				<span class="text-[var(--color-text-secondary)] w-8 text-right font-mono">{pokemon.estadisticas?.ataque || 0}</span>
			</div>
			<div class="flex items-center gap-2 text-xs">
				<span class="text-[var(--color-text-muted)] w-8">DEF</span>
				<div class="flex-1 bg-[var(--color-bg-elevated)] rounded-full h-1.5 overflow-hidden">
					<div
						class="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500"
						style="width: {Math.min((pokemon.estadisticas?.defensa || 0) / 255 * 100, 100)}%"
					></div>
				</div>
				<span class="text-[var(--color-text-secondary)] w-8 text-right font-mono">{pokemon.estadisticas?.defensa || 0}</span>
			</div>
		</div>

		<!-- Action button -->
		<button
			onclick={verDetalles}
			class="w-full bg-[var(--color-bg-hover)] hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-white text-center py-2.5 px-4 rounded-lg font-medium transition-all duration-200 text-sm flex items-center justify-center gap-2"
		>
			<span>Ver detalles</span>
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9,18 15,12 9,6"/>
			</svg>
		</button>
	</div>
</div>
