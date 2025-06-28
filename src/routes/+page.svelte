<script>
	import PokemonAleatorio from '$lib/components/PokemonAleatorio.svelte';
	import TarjetaPokemon from '$lib/components/TarjetaPokemon.svelte';

	let { data } = $props();

	const accionesRapidas = [
		{
			titulo: 'Buscar Pokémon',
			descripcion: 'Encuentra cualquier Pokémon por nombre o tipo',
			icono: '🔍',
			enlace: '/pokemones'
		},
		{
			titulo: 'Explorar Movimientos',
			descripcion: 'Descubre todos los movimientos disponibles',
			icono: '💫',
			enlace: '/movimientos'
		},
		{
			titulo: 'Ver Equipos',
			descripcion: 'Explora equipos ya creados',
			icono: '👥',
			enlace: '/equipos'
		}
	];
</script>

<svelte:head>
	<title>PokeAPI</title>
</svelte:head>

<div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
	<main class="flex-1">
		<!-- Sección de acciones rápidas -->
		<section class="py-8 sm:py-12">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<h2 class="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-16 text-center drop-shadow-l pb-8">
					¿Qué te gustaría hacer?
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
					<!-- Contenedor acciones -->

					{#each accionesRapidas as accion}
						<a
							href={accion.enlace}
							class="bg-white/90 rounded-2xl p-6 text-center border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group shadow-lg"
						>
							<div class="text-5xl mb-4 block">
								{accion.icono}
							</div>

							<h3 class="text-xl font-bold mb-2 text-slate-800 group-hover:text-blue-600">
								{accion.titulo}
							</h3>

							<p class="text-slate-600 text-base">
								{accion.descripcion}
							</p>
						</a>
					{/each}
				</div>
			</div>
		</section>

		<!-- Pokemones destacados -->
		<section class="py-8 sm:py-12">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					class="flex justify-between items-center mb-8 sm:mb-12 flex-col md:flex-row gap-4 text-center md:text-left"
				>
					<!-- Arriba -->

					<h2 class="text-3xl font-bold text-slate-800">Pokémon Destacados</h2>

					<a
						href="/pokemones"
						class="inline-flex items-center gap-2 px-4 sm:px-6 py-2 bg-white/90 text-slate-800 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
					>
						Ver todos
					</a>
				</div>
				<!-- Arriba -->

				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<!-- Lista pokemones -->

					{#each data.pokemones as pokemon}
						<TarjetaPokemon {pokemon} />
					{/each}
				</div>
				<!-- Lista pokemones -->
			</div>
		</section>

		<!-- Sección de prueba del loading -->
		<section class="py-8 sm:py-12">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<PokemonAleatorio />
			</div>
		</section>
	</main>
</div>
