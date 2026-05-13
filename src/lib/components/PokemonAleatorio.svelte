<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/constantes/index.js';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import EtiquetaTipo from './EtiquetaTipo.svelte';

	let pokemonData = $state(null);
	let errorMessage = $state('');
	let cargando = $state(false);

	async function buscarPokemonAleatorio() {
		showLoading('Buscando un Pokemon random...');
		errorMessage = '';
		cargando = true;

		try {
			const randomId = Math.floor(Math.random() * 898) + 1;
			const response = await fetch(`${API_URL}/pokemon/${randomId}`);
			if (response.ok) {
				pokemonData = await response.json();
			} else {
				errorMessage = `Error al cargar el Pokemon (${response.status})`;
			}
		} catch (err) {
			errorMessage = `Error de conexión: ${err.message}`;
		} finally {
			cargando = false;
			hideLoading();
		}
	}

	function verDetalles() {
		if (pokemonData) {
			showLoading('Cargando ficha del Pokemon...');
			goto(`/pokemones/${pokemonData.id}`);
		}
	}

	function getStatGradient(value) {
		if (value >= 100) return 'linear-gradient(90deg, #0ea5e9, #06b6d4)';
		if (value >= 75) return 'linear-gradient(90deg, #10b981, #0ea5e9)';
		if (value >= 50) return 'linear-gradient(90deg, #f59e0b, #f97316)';
		return 'linear-gradient(90deg, #ef4444, #f97316)';
	}

	const statLabels = {
		puntos_de_golpe: 'HP',
		ataque: 'Ataque',
		defensa: 'Defensa',
		ataque_especial: 'Atq Esp',
		defensa_especial: 'Def Esp',
		velocidad: 'Velocidad'
	};
</script>

<section class="random-encounter ui-card">
	<div class="random-encounter__header">
		<div>
			<p class="ui-kicker">Zona random</p>
			<h3>Pokémon al azar</h3>
			<p class="ui-subtitle">Tirá uno sorpresa para inspirar tu equipo.</p>
		</div>
		<button onclick={buscarPokemonAleatorio} class="ui-button primary" disabled={cargando}>
			{cargando ? 'Buscando...' : 'Tirar uno'}
		</button>
	</div>

	{#if errorMessage}
		<div class="random-encounter__alert">
			{errorMessage}
		</div>
	{/if}

	{#if pokemonData}
		<div class="random-encounter__content">
			<div class="random-encounter__profile">
				<img
					src={pokemonData.imagen}
					alt={pokemonData.nombre}
					style="filter: drop-shadow(0 8px 20px rgba(14,165,233,0.4))"
				/>
				<div>
					<h4>{pokemonData.nombre}</h4>
					<div class="random-encounter__types">
						{#each pokemonData.tipos as tipo}
							<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
						{/each}
					</div>
				</div>
			</div>

			{#if pokemonData.estadisticas}
				<div class="random-encounter__stats">
					{#each Object.entries(statLabels) as [key, label]}
						{@const value = pokemonData.estadisticas[key] ?? 0}
						{@const pct = Math.min((value / 150) * 100, 100)}
						<div class="ui-stat">
							<span class="stat-name">{label}</span>
							<span class="stat-value">{value}</span>
							<div class="ui-bar">
								<span style="width:{pct}%; background:{getStatGradient(value)};"></span>
							</div>
						</div>
					{/each}
				</div>
			{/if}

			<div class="random-encounter__cta">
				<button onclick={verDetalles} class="ui-button ghost">
					Ver ficha completa
				</button>
			</div>
		</div>
	{/if}
</section>
