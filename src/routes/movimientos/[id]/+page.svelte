<script>
	import { goto } from '$app/navigation';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onMount } from 'svelte';
	
	let { data } = $props();
	
	// Mostrar loading al cargar la página
	onMount(() => {
		showLoading('Cargando información del movimiento...');
		setTimeout(() => {
			hideLoading();
		}, 600);
	});
	
	function getTypeColor(typeName) {
		const colors = {
			'Normal': 'bg-gray-400',
			'Lucha': 'bg-red-600',
			'Volador': 'bg-blue-400',
			'Veneno': 'bg-purple-500',
			'Tierra': 'bg-yellow-600',
			'Roca': 'bg-yellow-800',
			'Insecto': 'bg-green-500',
			'Fantasma': 'bg-purple-700',
			'Acero': 'bg-gray-600',
			'Fuego': 'bg-red-500',
			'Agua': 'bg-blue-500',
			'Planta': 'bg-green-600',
			'Eléctrico': 'bg-yellow-400',
			'Psíquico': 'bg-pink-500',
			'Hielo': 'bg-blue-300',
			'Dragón': 'bg-purple-800',
			'Siniestro': 'bg-gray-800',
			'Hada': 'bg-pink-300'
		};
		return colors[typeName] || 'bg-gray-400';
	}
	
	function getCategoryIcon(category) {
		const icons = {
			'Físico': '👊',
			'Especial': '✨',
			'Estado': '🔄'
		};
		return icons[category] || '❓';
	}
	
	function verPokemon(pokemonId) {
		showLoading('Cargando información del Pokémon...');
		goto(`/pokemones/${pokemonId}`);
	}
</script>

<svelte:head>
	<title>{data.movimiento.nombre} - Movimientos - PokéAPI</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8">
	<!-- Header con navegación -->
	<div class="bg-white shadow-sm border-b">
		<div class="max-w-7xl mx-auto px-4 py-4">
			<a
				href="/movimientos"
				class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
			>
				<span class="text-xl">←</span>
				Volver a Movimientos
			</a>
		</div>
	</div>

	<div class="max-w-6xl mx-auto px-4 py-8">
		<!-- Tarjeta principal del movimiento -->
		<div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
			<div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
				<div class="text-center">
					<h1 class="text-5xl font-bold mb-4">{data.movimiento.nombre}</h1>
					<div class="flex flex-wrap gap-3 justify-center mb-6">
						<span class="px-4 py-2 {getTypeColor(data.movimiento.tipo.nombre)} text-white rounded-full font-semibold shadow-lg">
							{data.movimiento.tipo.nombre}
						</span>
						<span class="px-4 py-2 bg-white/20 text-white rounded-full font-semibold shadow-lg backdrop-blur-sm">
							{getCategoryIcon(data.movimiento.categoria)} {data.movimiento.categoria}
						</span>
					</div>
					<p class="text-xl opacity-90 max-w-3xl mx-auto">{data.movimiento.efecto}</p>
				</div>
			</div>
		</div>

		<!-- Grid de estadísticas del movimiento -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-3xl font-bold text-red-500 mb-2">{data.movimiento.potencia || '—'}</div>
				<div class="text-slate-600 font-medium">Potencia</div>
			</div>
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-3xl font-bold text-blue-500 mb-2">{data.movimiento.precision || '—'}%</div>
				<div class="text-slate-600 font-medium">Precisión</div>
			</div>
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-3xl font-bold text-green-500 mb-2">{data.movimiento.puntos_de_poder}</div>
				<div class="text-slate-600 font-medium">PP</div>
			</div>
			<div class="bg-white rounded-xl shadow-lg p-6 text-center">
				<div class="text-lg font-bold text-purple-500 mb-2">{data.movimiento.generacion.nombre}</div>
				<div class="text-slate-600 font-medium">Generación</div>
			</div>
		</div>

		<!-- Pokémon que aprenden el movimiento -->
		
		<!-- Por huevo -->
		{#if data.movimiento.pokemon_por_huevo && data.movimiento.pokemon_por_huevo.length > 0}
			<div class="bg-white rounded-xl shadow-lg p-6 mb-8">
				<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
					<span>🥚</span>
					Pokémon que aprenden por Huevo
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{#each data.movimiento.pokemon_por_huevo as pokemon}
						<button
							onclick={() => verPokemon(pokemon.id)}
							class="group bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
						>
							<img 
								src={pokemon.imagen} 
								alt={pokemon.nombre}
								class="w-20 h-20 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<h3 class="font-semibold text-slate-800 capitalize text-sm mb-1">{pokemon.nombre}</h3>
							<div class="text-xs text-slate-600">
								<div>Altura: {pokemon.altura}m</div>
								<div>Peso: {pokemon.peso}kg</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Por máquina -->
		{#if data.movimiento.pokemon_por_maquina && data.movimiento.pokemon_por_maquina.length > 0}
			<div class="bg-white rounded-xl shadow-lg p-6 mb-8">
				<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
					<span>🔧</span>
					Pokémon que aprenden por Máquina
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{#each data.movimiento.pokemon_por_maquina as pokemon}
						<button
							onclick={() => verPokemon(pokemon.id)}
							class="group bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
						>
							<img 
								src={pokemon.imagen} 
								alt={pokemon.nombre}
								class="w-20 h-20 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<h3 class="font-semibold text-slate-800 capitalize text-sm mb-1">{pokemon.nombre}</h3>
							<div class="text-xs text-slate-600">
								<div>Altura: {pokemon.altura}m</div>
								<div>Peso: {pokemon.peso}kg</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Por nivel -->
		{#if data.movimiento.pokemon_por_nivel && data.movimiento.pokemon_por_nivel.length > 0}
			<div class="bg-white rounded-xl shadow-lg p-6">
				<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
					<span>📈</span>
					Pokémon que aprenden por Nivel
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{#each data.movimiento.pokemon_por_nivel as pokemon}
						<button
							onclick={() => verPokemon(pokemon.id)}
							class="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
						>
							<img 
								src={pokemon.imagen} 
								alt={pokemon.nombre}
								class="w-20 h-20 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<h3 class="font-semibold text-slate-800 capitalize text-sm mb-1">{pokemon.nombre}</h3>
							<div class="text-xs text-slate-600">
								<div>Altura: {pokemon.altura}m</div>
								<div>Peso: {pokemon.peso}kg</div>
							</div>
						</button>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
