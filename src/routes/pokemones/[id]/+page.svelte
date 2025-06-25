<script>
	import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import { onDestroy } from 'svelte';
	
	let { data } = $props();
	let previousId = null;

	// Manejar loading después de cada navegación
	afterNavigate((navigation) => {
		const currentId = $page.params.id;
		
		// Si es la primera carga o cambio de ID, mostrar loading brevemente
		if (previousId !== currentId) {
			showLoading('Cargando información del Pokémon...');
			setTimeout(() => {
				hideLoading();
				previousId = currentId;
			}, 300);
		}
	});

	// Limpiar loading antes de navegar
	beforeNavigate(() => {
		hideLoading();
	});

	// Asegurar que el loading se oculta cuando el componente se destruye
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
			'Electrico': 'bg-yellow-400',
			'Psiquico': 'bg-pink-500',
			'Hielo': 'bg-blue-300',
			'Dragon': 'bg-purple-800',
			'Siniestro': 'bg-gray-800',
			'Hada': 'bg-pink-300'
		};
		return colors[typeName] || 'bg-gray-400';
	}
	
	function getStatColor(value) {
		if (value >= 100) return 'bg-green-500';
		if (value >= 70) return 'bg-yellow-500';
		if (value >= 50) return 'bg-orange-500';
		return 'bg-red-500';
	}
	
	function verEvolucion(evolucionId) {
		goto(`/pokemones/${evolucionId}`);
	}
</script>

<svelte:head>
	<title>{data.pokemon.nombre} - Pokémon - PokéAPI</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
	<!-- Header con navegación -->
	<div class="bg-white shadow-sm border-b">
		<div class="max-w-7xl mx-auto px-4 py-4">
			<a
				href="/pokemones"
				class="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
			>
				<span class="text-xl">←</span>
				Volver a Pokémones
			</a>
		</div>
	</div>

	<div class="max-w-6xl mx-auto px-4 py-8">
		<!-- Tarjeta principal del Pokémon -->
		<div class="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
			<div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
				<div class="flex flex-col lg:flex-row items-center gap-8">
					<!-- Imagen del Pokémon -->
					<div class="flex-shrink-0">
						<div class="bg-white/20 rounded-full p-4 backdrop-blur-sm">
							<img 
								src={imagen} 
								alt={`Imagen del pokémon ${nombre}`} 
								class="w-48 h-48 object-contain"
							/>
						</div>
					</div>
					
					<!-- Información básica -->
					<div class="flex-1 text-center lg:text-left">
						<h1 class="text-5xl font-bold capitalize mb-4">{nombre}</h1>
						<div class="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
							{#each tipos as tipo}
								<span class="px-4 py-2 {getTypeColor(tipo.nombre)} text-white rounded-full font-semibold shadow-lg">
									{tipo.nombre}
								</span>
							{/each}
						</div>
						
						<!-- Información física -->
						<div class="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0">
							<div class="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
								<div class="text-sm opacity-90">Altura</div>
								<div class="text-2xl font-bold">{altura}m</div>
							</div>
							<div class="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
								<div class="text-sm opacity-90">Peso</div>
								<div class="text-2xl font-bold">{peso}kg</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Grid de información detallada -->
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
			<!-- Estadísticas -->
			<div class="bg-white rounded-xl shadow-lg p-6">
				<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
					<span>📊</span>
					Estadísticas Base
				</h2>
				<div class="space-y-4">
					{#each [
						{ name: 'HP', value: puntosDeGolpe, key: 'hp' },
						{ name: 'Ataque', value: ataque, key: 'attack' },
						{ name: 'Defensa', value: defensa, key: 'defense' },
						{ name: 'Ataque Esp.', value: ataqueEspecial, key: 'sp-attack' },
						{ name: 'Defensa Esp.', value: defensaEspecial, key: 'sp-defense' },
						{ name: 'Velocidad', value: velocidad, key: 'speed' }
					] as stat}
						<div>
							<div class="flex justify-between items-center mb-2">
								<span class="font-medium text-slate-700">{stat.name}</span>
								<span class="font-bold text-slate-800">{stat.value}</span>
							</div>
							<div class="w-full bg-gray-200 rounded-full h-3">
								<div 
									class="h-3 rounded-full transition-all duration-700 {getStatColor(stat.value)}"
									style="width: {Math.min((stat.value / 150) * 100, 100)}%"
								></div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Habilidades -->
			<div class="bg-white rounded-xl shadow-lg p-6">
				<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
					<span>⚡</span>
					Habilidades
				</h2>
				<div class="space-y-4">
					{#each habilidades as habilidad}
						<div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
							<h3 class="font-semibold text-slate-800 mb-2">{habilidad.nombre}</h3>
							<p class="text-slate-600 text-sm leading-relaxed">{habilidad.descripcion}</p>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Evoluciones -->
		{#if evoluciones && evoluciones.length > 0}
			<div class="bg-white rounded-xl shadow-lg p-6 mb-8">
				<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
					<span>🔄</span>
					Evoluciones
				</h2>
				<div class="flex flex-wrap gap-6 justify-center">
					{#each evoluciones as evolucion}
						<button 
							onclick={() => verEvolucion(evolucion.id)}
							class="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
						>
							<img 
								src={evolucion.imagen} 
								alt={evolucion.nombre}
								class="w-24 h-24 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300"
							/>
							<p class="text-center font-medium text-slate-700 capitalize">{evolucion.nombre}</p>
						</button>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Sección de tipos con debilidades -->
		<div class="bg-white rounded-xl shadow-lg p-6 mb-8">
			<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
				<span>🛡️</span>
				Tipos y Debilidades
			</h2>
			<div class="space-y-4">
				{#each tipos as tipo}
					<div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
						<div class="flex items-center gap-3 mb-3">
							<span class="px-3 py-1 {getTypeColor(tipo.nombre)} text-white rounded-full font-semibold">
								{tipo.nombre}
							</span>
						</div>
						{#if tipo.debilidades && tipo.debilidades.length > 0}
							<div>
								<span class="text-sm font-medium text-slate-600 mb-2 block">Débil contra:</span>
								<div class="flex flex-wrap gap-2">
									{#each tipo.debilidades as debilidad}
										<span class="px-2 py-1 {getTypeColor(debilidad.nombre)} text-white rounded-full text-xs">
											{debilidad.nombre}
										</span>
									{/each}
								</div>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>

		<!-- Secciones de movimientos -->
		<div class="bg-white rounded-xl shadow-lg p-6">
			<h2 class="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
				<span>⚔️</span>
				Movimientos
			</h2>
			
			<!-- Movimientos por huevo -->
			{#if movimientosHuevo && movimientosHuevo.length > 0}
				<div class="mb-8">
					<h3 class="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
						<span>🥚</span>
						Por Huevo
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each movimientosHuevo as movimiento}
							<a 
								href="/movimientos/{movimiento.id}"
								class="group bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
							>
								<h4 class="font-semibold text-slate-800 group-hover:text-pink-600 mb-2">{movimiento.nombre}</h4>
								<div class="flex flex-wrap gap-2 text-sm">
									<span class="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">{movimiento.tipo.nombre}</span>
									<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{movimiento.categoria}</span>
									{#if movimiento.potencia}
										<span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">⚡ {movimiento.potencia}</span>
									{/if}
									{#if movimiento.precision}
										<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">🎯 {movimiento.precision}%</span>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Movimientos por máquina -->
			{#if movimientosMaquina && movimientosMaquina.length > 0}
				<div class="mb-8">
					<h3 class="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
						<span>🔧</span>
						Por Máquina (MT/MO)
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each movimientosMaquina as movimiento}
							<a 
								href="/movimientos/{movimiento.id}"
								class="group bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
							>
								<h4 class="font-semibold text-slate-800 group-hover:text-blue-600 mb-2">{movimiento.nombre}</h4>
								<div class="flex flex-wrap gap-2 text-sm">
									<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{movimiento.tipo.nombre}</span>
									<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{movimiento.categoria}</span>
									{#if movimiento.potencia}
										<span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">⚡ {movimiento.potencia}</span>
									{/if}
									{#if movimiento.precision}
										<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">🎯 {movimiento.precision}%</span>
									{/if}
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/if}
			
			<!-- Movimientos por nivel -->
			{#if movimientosNivel && movimientosNivel.length > 0}
				<div>
					<h3 class="text-xl font-semibold text-slate-700 mb-4 flex items-center gap-2">
						<span>📈</span>
						Por Nivel
					</h3>
					<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each movimientosNivel as movimiento}
							<a 
								href="/movimientos/{movimiento.id}"
								class="group bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
							>
								<h4 class="font-semibold text-slate-800 group-hover:text-green-600 mb-2">{movimiento.nombre}</h4>
								<div class="flex flex-wrap gap-2 text-sm">
									<span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">{movimiento.tipo.nombre}</span>
									<span class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">{movimiento.categoria}</span>
									{#if movimiento.potencia}
										<span class="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">⚡ {movimiento.potencia}</span>
									{/if}
									{#if movimiento.precision}
										<span class="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">🎯 {movimiento.precision}%</span>
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