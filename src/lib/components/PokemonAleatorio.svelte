<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/constantes/index.js';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import EtiquetaTipo from './EtiquetaTipo.svelte';
	
	let pokemonData = $state(null);
	let errorMessage = $state('');
	
	async function buscarPokemonAleatorio() {
		showLoading('Buscando un Pokemon random...');
		errorMessage = '';
		
		try {
			const randomId = Math.floor(Math.random() * 150) + 1;
			const url = `${API_URL}/pokemon/${randomId}`;
			const response = await fetch(url);
			if (response.ok) {
				const data = await response.json();
				pokemonData = data;
			} else {
				const errorText = await response.text();
				errorMessage = `Error al cargar el Pokemon: ${response.status} - ${errorText}`;
			}
		} catch (err) {
			errorMessage = `Error de conexion: ${err.message}. Revisa tu conexion a internet y la API.`;
		} finally {
			hideLoading();
		}
	}
	
	function verDetalles() {
		if (pokemonData) {
			showLoading('Cargando ficha del Pokemon...');
			goto(`/pokemones/${pokemonData.id}`);
		}
	}
	
	function getStatColor(statName) {
		const colors = {
			'hp': '#e76f51',
			'attack': '#f4a261',
			'defense': '#e9c46a',
			'special-attack': '#48b4a8',
			'special-defense': '#8ab17d',
			'speed': '#5268f2'
		};
		return colors[statName] || '#9aa1ad';
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

<section class="random-encounter ui-card">
	<div class="random-encounter__header">
		<div>
			<p class="ui-kicker">Zona random</p>
			<h3>Pokemon al azar</h3>
			<p class="ui-subtitle">Te tiramos uno sorpresa para inspirar tu equipo.</p>
		</div>
		<button onclick={buscarPokemonAleatorio} class="ui-button primary">
			Tirar uno
		</button>
	</div>

	{#if errorMessage}
		<div class="random-encounter__alert">
			<span>{errorMessage}</span>
		</div>
	{/if}

	{#if pokemonData}
		<div class="random-encounter__content">
			<div class="random-encounter__profile">
				<img src={pokemonData.imagen} alt={pokemonData.nombre} />
				<div>
					<h4>{pokemonData.nombre}</h4>
					<div class="random-encounter__types">
						{#each pokemonData.tipos as tipo}
							<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
						{/each}
					</div>
				</div>
			</div>

			<div class="random-encounter__stats">
				{#each ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'] as statName}
					{@const value = getStatValue(statName)}
					{@const percentage = Math.min((value / 150) * 100, 100)}
					<div class="ui-stat">
						<span class="stat-name">{statName.replace('-', ' ')}</span>
						<span class="stat-value">{value}</span>
						<div class="ui-bar">
							<span style={`width:${percentage}%; background:${getStatColor(statName)}`}></span>
						</div>
					</div>
				{/each}
			</div>

			<div class="random-encounter__cta">
				<button onclick={verDetalles} class="ui-button ghost">
					Ver ficha completa
				</button>
			</div>
		</div>
	{/if}
</section>
