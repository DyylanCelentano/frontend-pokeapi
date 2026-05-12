<script>
	import { goto } from '$app/navigation';
	import PokemonAleatorio from '$lib/components/PokemonAleatorio.svelte';
	import TarjetaPokemon from '$lib/components/TarjetaPokemon.svelte';
	import { showLoading } from '$lib/stores/loading.js';

	let { data } = $props();

	const accionesRapidas = [
		{
			titulo: 'Buscar Pokemon',
			descripcion: 'Encuentra cualquier Pokemon por nombre o tipo',
			icono: 'search',
			enlace: '/pokemones',
			color: 'var(--color-accent)'
		},
		{
			titulo: 'Explorar Movimientos',
			descripcion: 'Descubre todos los movimientos disponibles',
			icono: 'bolt',
			enlace: '/movimientos',
			color: 'var(--tipo-electrico)'
		},
		{
			titulo: 'Ver Equipos',
			descripcion: 'Explora equipos ya creados',
			icono: 'users',
			enlace: '/equipos',
			color: 'var(--tipo-dragon)'
		}
	];
	
	const iconos = {
		search: `<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
		bolt: `<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>`,
		users: `<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
	};
	
	function navigateTo(enlace) {
		showLoading('Cargando seccion...');
		goto(enlace);
	}
</script>

<svelte:head>
	<title>IntroDex - Pokemon Database</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg-primary)]">
	<main class="flex-1">
		<!-- Hero Section -->
		<section class="py-16 sm:py-24 relative overflow-hidden">
			<!-- Animated background elements -->
			<div class="absolute top-20 left-1/4 w-72 h-72 bg-[var(--color-accent)]/5 rounded-full blur-3xl animate-pulse"></div>
			<div class="absolute bottom-10 right-1/4 w-96 h-96 bg-[var(--tipo-dragon)]/5 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
			<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--tipo-psiquico)]/3 rounded-full blur-3xl opacity-20"></div>
			
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div class="text-center mb-16 animate-fade-in-up">
					<h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
						Que te gustaria hacer?
					</h1>
					<p class="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
						Explora la base de datos completa de Pokemon, movimientos y crea tus propios equipos.
					</p>
				</div>
				
				<!-- Action Cards -->
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					{#each accionesRapidas as accion, i}
						<button
							onclick={() => navigateTo(accion.enlace)}
							class="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 transition-all duration-300 hover:border-[var(--color-border-focus)] card-interactive text-left animate-fade-in-up"
							style="animation-delay: {(i + 1) * 0.1}s; --accent-color: {accion.color};"
						>
							<div 
								class="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
								style="background: color-mix(in srgb, {accion.color} 15%, transparent); color: {accion.color};"
							>
								<div class="group-hover:scale-110 transition-transform duration-300">
									{@html iconos[accion.icono]}
								</div>
							</div>

							<h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
								{accion.titulo}
							</h3>

							<p class="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
								{accion.descripcion}
							</p>
							
							<div class="flex items-center gap-2 text-sm text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors">
								<span>Explorar</span>
								<svg class="w-4 h-4 transition-transform group-hover:translate-x-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<polyline points="9,18 15,12 9,6"/>
								</svg>
							</div>
						</button>
					{/each}
				</div>
			</div>
		</section>

		<!-- Featured Pokemon -->
		<section class="py-12 sm:py-16 border-t border-[var(--color-border)]">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between items-center mb-10 flex-col md:flex-row gap-4">
					<div class="animate-slide-in-right">
						<h2 class="text-2xl font-bold text-[var(--color-text-primary)]">Pokemon Destacados</h2>
						<p class="text-[var(--color-text-secondary)] mt-1">Descubre algunos Pokemon populares</p>
					</div>

					<button
						onclick={() => navigateTo('/pokemones')}
						class="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] rounded-lg font-medium transition-all duration-300 text-sm group"
					>
						Ver todos
						<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9,18 15,12 9,6"/>
						</svg>
					</button>
				</div>

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{#each data.pokemones as pokemon, i}
						<div style="animation-delay: {i * 0.1}s;">
							<TarjetaPokemon {pokemon} />
						</div>
					{/each}
				</div>
			</div>
		</section>

		<!-- Random Pokemon Section -->
		<section class="py-12 sm:py-16 border-t border-[var(--color-border)]">
			<div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
				<PokemonAleatorio />
			</div>
		</section>
	</main>
</div>
