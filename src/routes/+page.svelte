<script>
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

<!-- Sección de acciones rápidas -->
<section class="py-12">
	<div class="max-w-7xl mx-auto px-4">
		<h2 class="text-3xl font-bold text-center mb-12 text-slate-800">¿Qué te gustaría hacer?</h2>
		<div class="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
			<!-- Contenedor acciones -->

			{#each accionesRapidas as accion}				<a
					href={accion.enlace}
					class="bg-white rounded-xl p-6 text-center border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group w-64 flex-shrink-0"
				>
					<div class="text-5xl mb-4 block">
						{accion.icono}
					</div>

					<h3 class="text-xl font-semibold mb-2 text-slate-800 group-hover:text-blue-600">
						{accion.titulo}
					</h3>

					<p class="text-slate-600 text-sm">
						{accion.descripcion}
					</p>
				</a>
			{/each}
		</div>
		<!-- Contenedor acciones -->
	</div>
</section>

<!-- Pokemones destacados -->
<section class="py-12">
	<div class="max-w-7xl mx-auto px-4">
		<div
			class="flex justify-between items-center mb-12 flex-col md:flex-row gap-4 text-center md:text-left"
		>
			<!-- Arriba -->

			<h2 class="text-3xl font-bold text-slate-800">Pokémon Destacados</h2>

			<a
				href="/pokemones"
				class="inline-flex items-center gap-2 px-6 py-2 bg-white text-slate-800 border border-slate-200 rounded-lg font-medium hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
			>
				Ver todos
			</a>
		</div>
		<!-- Arriba -->

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Lista pokemones -->

			{#each data.pokemones as pokemon}
				<TarjetaPokemon {pokemon} />
			{/each}
		</div>
		<!-- Lista pokemones -->
	</div>
</section>
