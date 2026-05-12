<script>
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onDestroy } from 'svelte';
	
	let { data } = $props();
	let previousId = null;

	afterNavigate((navigation) => {
		const currentId = $page.params.id;
		if (previousId !== currentId) {
			showLoading('Cargando informacion del Pokemon...');
			setTimeout(() => {
				hideLoading();
				previousId = currentId;
			}, 300);
		}
	});

	beforeNavigate(() => {
		hideLoading();
	});

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
		if (value >= 100) return 'bg-[var(--color-success)]';
		if (value >= 70) return 'bg-[var(--color-warning)]';
		if (value >= 50) return 'bg-[var(--tipo-fuego)]';
		return 'bg-[var(--color-error)]';
	}
	
	function verEvolucion(evolucionId) {
		showLoading('Cargando evolucion...');
		goto(`/pokemones/${evolucionId}`);
	}
	
	const stats = $derived([
		{ name: 'HP', value: puntosDeGolpe },
		{ name: 'Ataque', value: ataque },
		{ name: 'Defensa', value: defensa },
		{ name: 'Atq. Esp.', value: ataqueEspecial },
		{ name: 'Def. Esp.', value: defensaEspecial },
		{ name: 'Velocidad', value: velocidad }
	]);
</script>

<svelte:head>
	<title>{data.pokemon.nombre} - IntroDex</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg-primary)]">
	<!-- Header -->
	<div class="border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
		<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<a
				href="/pokemones"
				class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15,18 9,12 15,6"/>
				</svg>
				Volver a Pokemon
			</a>
		</div>
	</div>

	<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<!-- Main Pokemon Card -->
		<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden mb-8">
			<div class="p-8">
				<div class="flex flex-col lg:flex-row items-center gap-8">
					<!-- Pokemon Image -->
					<div class="flex-shrink-0 relative">
						<div class="w-48 h-48 rounded-2xl bg-[var(--color-bg-elevated)] flex items-center justify-center">
							<img 
								src={imagen} 
								alt={`Imagen del pokemon ${nombre}`} 
								class="w-40 h-40 object-contain"
							/>
						</div>
						<div class="absolute -top-2 -right-2 bg-[var(--color-bg-primary)] border border-[var(--color-border)] px-3 py-1 rounded-lg text-sm font-mono text-[var(--color-text-muted)]">
							#{id.toString().padStart(3, '0')}
						</div>
					</div>
					
					<!-- Basic Info -->
					<div class="flex-1 text-center lg:text-left">
						<h1 class="text-4xl font-bold text-[var(--color-text-primary)] capitalize mb-4">{nombre}</h1>
						<div class="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
							{#each tipos as tipo}
								<EtiquetaTipo tipo={tipo.nombre} tamaño="lg" />
							{/each}
						</div>
						
						<!-- Physical info -->
						<div class="grid grid-cols-2 gap-4 max-w-xs mx-auto lg:mx-0">
							<div class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4">
								<div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Altura</div>
								<div class="text-xl font-semibold text-[var(--color-text-primary)]">{altura}m</div>
							</div>
							<div class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4">
								<div class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Peso</div>
								<div class="text-xl font-semibold text-[var(--color-text-primary)]">{peso}kg</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Stats and Abilities Grid -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
			<!-- Stats -->
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
				<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<line x1="18" y1="20" x2="18" y2="10"/>
						<line x1="12" y1="20" x2="12" y2="4"/>
						<line x1="6" y1="20" x2="6" y2="14"/>
					</svg>
					Estadisticas Base
				</h2>
				<div class="space-y-4">
					{#each stats as stat}
						<div>
							<div class="flex justify-between items-center mb-2">
								<span class="text-sm text-[var(--color-text-secondary)]">{stat.name}</span>
								<span class="text-sm font-semibold text-[var(--color-text-primary)] font-mono">{stat.value}</span>
							</div>
							<div class="w-full bg-[var(--color-bg-elevated)] rounded-full h-2">
								<div 
									class="h-2 rounded-full transition-all duration-700 {getStatColor(stat.value)}"
									style="width: {Math.min((stat.value / 150) * 100, 100)}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Abilities -->
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
				<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
					</svg>
					Habilidades
				</h2>
				<div class="space-y-4">
					{#each habilidades as habilidad}
						<div class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4">
							<h3 class="font-medium text-[var(--color-text-primary)] mb-2">{habilidad.nombre}</h3>
							<p class="text-sm text-[var(--color-text-secondary)] leading-relaxed">{habilidad.descripcion}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Evolutions -->
		{#if evoluciones && evoluciones.length > 0}
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
				<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
					<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="23,4 23,10 17,10"/>
						<polyline points="1,20 1,14 7,14"/>
						<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
					</svg>
					Evoluciones
				</h2>
				<div class="flex flex-wrap gap-4 justify-center">
					{#each evoluciones as evolucion}
						<button 
							onclick={() => verEvolucion(evolucion.id)}
							class="group bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-xl p-4 hover:border-[var(--color-border-focus)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
						>
							<img 
								src={evolucion.imagen} 
								alt={evolucion.nombre}
								class="w-20 h-20 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<p class="text-center text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] capitalize transition-colors">{evolucion.nombre}</p>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Type Weaknesses -->
		<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8">
			<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
				<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
				</svg>
				Tipos y Debilidades
			</h2>
			<div class="space-y-4">
				{#each tipos as tipo}
					<div class="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4">
						<div class="flex items-center gap-3 mb-3">
							<EtiquetaTipo tipo={tipo.nombre} tamaño="md" />
						</div>
						{#if tipo.debilidades && tipo.debilidades.length > 0}
							<div>
								<span class="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-2 block">Debil contra:</span>
								<div class="flex flex-wrap gap-2">
									{#each tipo.debilidades as debilidad}
										<EtiquetaTipo tipo={debilidad.nombre} tamaño="sm" />
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Moves -->
		<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
			<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
				<svg class="w-5 h-5 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<polygon points="10,8 16,12 10,16 10,8"/>
				</svg>
				Movimientos
			</h2>
			
			<!-- Egg Moves -->
			{#if movimientosHuevo && movimientosHuevo.length > 0}
				<div class="mb-8">
					<h3 class="text-sm font-medium text-[var(--color-text-secondary)] mb-4 uppercase tracking-wider flex items-center gap-2">
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<ellipse cx="12" cy="12" rx="8" ry="10"/>
						</svg>
						Por Huevo
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{#each movimientosHuevo as movimiento}
							<a 
								href="/movimientos/{movimiento.id}"
								class="group bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-border-focus)] transition-all duration-200"
							>
								<h4 class="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] mb-2 text-sm">{movimiento.nombre}</h4>
								<div class="flex flex-wrap gap-1.5">
									<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
									<span class="px-2 py-0.5 bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] rounded text-xs">{movimiento.categoria}</span>
									{#if movimiento.potencia}
										<span class="px-2 py-0.5 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded text-xs">{movimiento.potencia}</span>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Machine Moves -->
			{#if movimientosMaquina && movimientosMaquina.length > 0}
				<div class="mb-8">
					<h3 class="text-sm font-medium text-[var(--color-text-secondary)] mb-4 uppercase tracking-wider flex items-center gap-2">
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/>
							<circle cx="12" cy="12" r="4"/>
						</svg>
						Por Maquina (MT/MO)
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{#each movimientosMaquina as movimiento}
							<a 
								href="/movimientos/{movimiento.id}"
								class="group bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-border-focus)] transition-all duration-200"
							>
								<h4 class="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] mb-2 text-sm">{movimiento.nombre}</h4>
								<div class="flex flex-wrap gap-1.5">
									<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
									<span class="px-2 py-0.5 bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] rounded text-xs">{movimiento.categoria}</span>
									{#if movimiento.potencia}
										<span class="px-2 py-0.5 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded text-xs">{movimiento.potencia}</span>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Level Moves -->
			{#if movimientosNivel && movimientosNivel.length > 0}
				<div>
					<h3 class="text-sm font-medium text-[var(--color-text-secondary)] mb-4 uppercase tracking-wider flex items-center gap-2">
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/>
							<polyline points="17,6 23,6 23,12"/>
						</svg>
						Por Nivel
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
						{#each movimientosNivel as movimiento}
							<a 
								href="/movimientos/{movimiento.id}"
								class="group bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-border-focus)] transition-all duration-200"
							>
								<h4 class="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] mb-2 text-sm">{movimiento.nombre}</h4>
								<div class="flex flex-wrap gap-1.5">
									<EtiquetaTipo tipo={movimiento.tipo.nombre} tamaño="sm" />
									<span class="px-2 py-0.5 bg-[var(--color-bg-primary)] text-[var(--color-text-muted)] rounded text-xs">{movimiento.categoria}</span>
									{#if movimiento.potencia}
										<span class="px-2 py-0.5 bg-[var(--color-error)]/10 text-[var(--color-error)] rounded text-xs">{movimiento.potencia}</span>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
