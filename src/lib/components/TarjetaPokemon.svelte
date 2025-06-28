<script lang="ts">
	import { goto } from '$app/navigation';
	import { showLoading } from '$lib/stores/loading.js';
	import EtiquetaTipo from './EtiquetaTipo.svelte';

	let { pokemon } = $props();
	
	function verDetalles() {
		showLoading('Cargando información del Pokémon...');
		goto(`/pokemones/${pokemon.id}`);
	}
</script>

<div
	class="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
>
	<div class="relative bg-gradient-to-br from-slate-50 to-slate-200 p-4 sm:p-6 text-center">
		<img
			src={pokemon.imagen || `/placeholder.svg?height=120&width=120`}
			alt={pokemon.nombre}
			class="w-24 h-24 sm:w-30 sm:h-30 object-contain mx-auto drop-shadow-md"
		/>
		<div
			class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-slate-500"
		>
			#{pokemon.id.toString().padStart(3, '0')}
		</div>
	</div>

	<div class="p-3 sm:p-4">
		<h3 class="text-base sm:text-lg font-bold text-slate-800 mb-3 text-center">{pokemon.nombre}</h3>

		<div class="flex flex-wrap justify-center gap-2 mb-4">
			{#each pokemon.tipos as tipo}
				<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
			{/each}
		</div>

		<!-- <div class="space-y-2 mb-4">
			<div class="flex items-center justify-between text-sm">
				<span class="text-slate-600 font-medium min-w-8">HP</span>
				<div class="flex-1 bg-slate-200 rounded-full h-2 mx-2 overflow-hidden">
					<div
						class="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full transition-all duration-500"
						style="width: {(pokemon.estadisticas.vida / 255) * 100}%"
					></div>
				</div>
				<span class="text-slate-800 font-semibold min-w-8 text-right"
					>{pokemon.estadisticas.vida}</span
				>
			</div>

			<div class="flex items-center justify-between text-sm">
				<span class="text-slate-600 font-medium min-w-8">ATQ</span>
				<div class="flex-1 bg-slate-200 rounded-full h-2 mx-2 overflow-hidden">
					<div
						class="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-500"
						style="width: {(pokemon.estadisticas.ataque / 255) * 100}%"
					></div>
				</div>
				<span class="text-slate-800 font-semibold min-w-8 text-right"
					>{pokemon.estadisticas.ataque}</span
				>
			</div>

			<div class="flex items-center justify-between text-sm">
				<span class="text-slate-600 font-medium min-w-8">DEF</span>
				<div class="flex-1 bg-slate-200 rounded-full h-2 mx-2 overflow-hidden">
					<div
						class="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transition-all duration-500"
						style="width: {(pokemon.estadisticas.defensa / 255) * 100}%"
					></div>
				</div>
				<span class="text-slate-800 font-semibold min-w-8 text-right"
					>{pokemon.estadisticas.defensa}</span
				>
			</div>
		</div> -->

		<div class="flex gap-2">
			<button
				onclick={verDetalles}
				class="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-md font-medium transition-colors text-sm"
			>
				Ver detalles
			</button>
		</div>
	</div>
</div>
