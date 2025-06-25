<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/constantes/index.js';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	
	let pokemonData = $state(null);
	let errorMessage = $state('');
	
	async function buscarPokemonAleatorio() {
		showLoading('Buscando un Pokémon salvaje...');
		errorMessage = '';
		
		try {
			const randomId = Math.floor(Math.random() * 150) + 1;
			console.log('Buscando Pokémon ID:', randomId);
			
			const response = await fetch(`${API_URL}/pokemon/${randomId}`);
			console.log('Response status:', response.status);
			
			if (response.ok) {
				const data = await response.json();
				console.log('Datos recibidos correctamente:', data.nombre);
				pokemonData = data;
			} else {
				const errorText = await response.text();
				console.error('Error response:', errorText);
				errorMessage = `Error al cargar el Pokémon: ${response.status}`;
			}
		} catch (err) {
			console.error('Error catch:', err);
			errorMessage = 'Error de conexión. Verifica tu conexión a internet.';
		} finally {
			hideLoading();
		}
	}
	
	function verDetalles() {
		if (pokemonData) {
			showLoading('Cargando información detallada del Pokémon...');
			goto(`/pokemones/${pokemonData.id}`);
		}
	}
	
	function getStatColor(statName) {
		const colors = {
			'hp': 'bg-red-500',
			'attack': 'bg-orange-500',
			'defense': 'bg-yellow-500',
			'special-attack': 'bg-blue-500',
			'special-defense': 'bg-green-500',
			'speed': 'bg-purple-500'
		};
		return colors[statName] || 'bg-gray-500';
	}
	
	function getStatValue(statName) {
		if (!pokemonData?.estadisticas) return 0;
		
		// Mapear nombres de estadísticas del frontend al backend
		const statMapping = {
			'hp': 'puntos_de_golpe',
			'attack': 'ataque',
			'defense': 'defensa',
			'special-attack': 'ataque_especial',
			'special-defense': 'defensa_especial',
			'speed': 'velocidad'
		};
		
		const backendStatName = statMapping[statName] || statName;
		return pokemonData.estadisticas[backendStatName] || 0;
	}
</script>

<div class="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
	<h3 class="text-xl font-bold text-slate-800 mb-4">🎲 Pokémon Aleatorio</h3>
	
	<button 
		onclick={buscarPokemonAleatorio}
		class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mb-4"
	>
		¡Encontrar Pokémon Salvaje!
	</button>
	
	{#if errorMessage}
		<div class="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-800">
			<div class="flex items-center gap-2">
				<span>⚠️</span>
				<span>{errorMessage}</span>
			</div>
		</div>
	{/if}
	
	{#if pokemonData}
		<div class="mt-4 p-6 bg-white rounded-lg border shadow-sm">
			<div class="flex flex-col lg:flex-row gap-6">
				<!-- Imagen y información básica -->
				<div class="flex-shrink-0">
					<img 
						src={pokemonData.imagen} 
						alt={pokemonData.nombre}
						class="w-32 h-32 mx-auto"
					/>
					<h4 class="font-bold text-2xl capitalize text-center mt-2">{pokemonData.nombre}</h4>
					<div class="flex gap-2 mt-2 justify-center">
						{#each pokemonData.tipos as tipo}
							<span class="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded-full font-medium">
								{tipo.nombre}
							</span>
						{/each}
					</div>
				</div>
				
				<!-- Estadísticas -->
				<div class="flex-1">
					<h5 class="font-semibold text-lg mb-3 text-slate-800">Estadísticas</h5>
					<div class="space-y-3">
						{#each ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'] as statName}
							{@const value = getStatValue(statName)}
							{@const percentage = Math.min((value / 150) * 100, 100)}
							<div>
								<div class="flex justify-between text-sm mb-1">
									<span class="capitalize font-medium">{statName.replace('-', ' ')}</span>
									<span class="text-slate-600">{value}</span>
								</div>
								<div class="w-full bg-gray-200 rounded-full h-2">
									<div 
										class="h-2 rounded-full transition-all duration-500 {getStatColor(statName)}"
										style="width: {percentage}%"
									></div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
			
			<!-- Botón para ver más detalles -->
			<div class="mt-6 text-center">
				<button 
					onclick={verDetalles}
					class="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 inline-flex items-center gap-2"
				>
					<span>👁️</span>
					Ver Detalles Completos
				</button>
			</div>
		</div>
	{/if}
</div>
