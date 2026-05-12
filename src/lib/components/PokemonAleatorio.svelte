<script>
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/constantes/index.js';
	import { hideLoading, showLoading } from '$lib/stores/loading.js';
	import EtiquetaTipo from './EtiquetaTipo.svelte';
	
	let pokemonData = $state(null);
	let errorMessage = $state('');
	
	async function buscarPokemonAleatorio() {
		showLoading('Buscando un Pokemon salvaje...');
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
				errorMessage = `Error al cargar el Pokemon: ${response.status}`;
			}
		} catch (err) {
			errorMessage = `Error de conexion: ${err.message}`;
		} finally {
			hideLoading();
		}
	}
	
	function verDetalles() {
		if (pokemonData) {
			showLoading('Cargando informacion detallada...');
			goto(`/pokemones/${pokemonData.id}`);
		}
	}
	
	function getStatColor(statName) {
		const colors = {
			'hp': 'bg-[var(--color-success)]',
			'attack': 'bg-[var(--color-error)]',
			'defense': 'bg-[var(--color-accent)]',
			'special-attack': 'bg-[var(--tipo-psiquico)]',
			'special-defense': 'bg-[var(--tipo-planta)]',
			'speed': 'bg-[var(--tipo-electrico)]'
		};
		return colors[statName] || 'bg-[var(--color-text-muted)]';
	}
	
	function getStatValue(statName) {
		if (!pokemonData?.estadisticas) return 0;
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
	
	const statLabels = {
		'hp': 'HP',
		'attack': 'Ataque',
		'defense': 'Defensa',
		'special-attack': 'Atq. Esp.',
		'special-defense': 'Def. Esp.',
		'speed': 'Velocidad'
	};
</script>

<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6">
	<div class="flex items-center gap-3 mb-5">
		<div class="w-10 h-10 rounded-lg bg-[var(--color-accent-muted)] flex items-center justify-center">
			<svg class="w-5 h-5 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
				<polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
				<line x1="12" y1="22.08" x2="12" y2="12"/>
			</svg>
		</div>
		<div>
			<h3 class="text-lg font-semibold text-[var(--color-text-primary)]">Pokemon Aleatorio</h3>
			<p class="text-sm text-[var(--color-text-muted)]">Descubre un Pokemon al azar</p>
		</div>
	</div>
	
	<button 
		onclick={buscarPokemonAleatorio}
		class="w-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
	>
		<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<polyline points="23,4 23,10 17,10"/>
			<polyline points="1,20 1,14 7,14"/>
			<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
		</svg>
		Encontrar Pokemon
	</button>
	
	{#if errorMessage}
		<div class="mt-4 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 rounded-lg">
			<div class="flex items-center gap-2 text-[var(--color-error)]">
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="12" cy="12" r="10"/>
					<line x1="12" y1="8" x2="12" y2="12"/>
					<line x1="12" y1="16" x2="12.01" y2="16"/>
				</svg>
				<span class="text-sm">{errorMessage}</span>
			</div>
		</div>
	{/if}
	
	{#if pokemonData}
		<div class="mt-5 p-5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg animate-fade-in">
			<div class="flex flex-col sm:flex-row gap-5">
				<!-- Image and basic info -->
				<div class="flex-shrink-0 text-center">
					<div class="relative inline-block">
						<img 
							src={pokemonData.imagen} 
							alt={pokemonData.nombre}
							class="w-28 h-28 object-contain"
						/>
					</div>
					<h4 class="font-semibold text-xl text-[var(--color-text-primary)] capitalize mt-2">{pokemonData.nombre}</h4>
					<p class="text-sm text-[var(--color-text-muted)] font-mono">#{pokemonData.id.toString().padStart(3, '0')}</p>
					<div class="flex flex-wrap gap-2 mt-3 justify-center">
						{#each pokemonData.tipos as tipo}
							<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
						{/each}
					</div>
				</div>
				
				<!-- Stats -->
				<div class="flex-1 min-w-0">
					<h5 class="font-medium text-sm text-[var(--color-text-secondary)] mb-3 uppercase tracking-wider">Estadisticas</h5>
					<div class="space-y-2.5">
						{#each ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'] as statName}
							{@const value = getStatValue(statName)}
							{@const percentage = Math.min((value / 150) * 100, 100)}
							<div class="flex items-center gap-2">
								<span class="text-xs text-[var(--color-text-muted)] w-16 truncate">{statLabels[statName]}</span>
								<div class="flex-1 bg-[var(--color-bg-primary)] rounded-full h-1.5 overflow-hidden">
									<div 
										class="h-full rounded-full transition-all duration-500 {getStatColor(statName)}"
										style="width: {percentage}%"
									></div>
								</div>
								<span class="text-xs text-[var(--color-text-secondary)] w-8 text-right font-mono">{value}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>
			
			<!-- Action button -->
			<div class="mt-5 pt-4 border-t border-[var(--color-border)]">
				<button 
					onclick={verDetalles}
					class="w-full bg-[var(--color-bg-hover)] hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
				>
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
						<circle cx="12" cy="12" r="3"/>
					</svg>
					Ver Detalles Completos
				</button>
			</div>
		</div>
	{/if}
</div>
