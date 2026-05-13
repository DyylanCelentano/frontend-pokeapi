<script>
	import { onMount } from 'svelte';
	import { API_URL } from '$lib/constantes/index.js';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import PokemonAleatorio from '$lib/components/PokemonAleatorio.svelte';

	let { data } = $props();
	let featured = $state(null);
	let featuredDetail = $state(null);
	let featuredLoading = $state(false);
	let featuredError = $state('');

	const FEATURED_DATE_KEY = 'introdex-featured-date';
	const FEATURED_ID_KEY = 'introdex-featured-id';
	const FEATURED_REFRESH_MS = 24 * 60 * 60 * 1000;
	const featuredStatFields = [
		{ key: 'puntos_de_golpe', label: 'HP' },
		{ key: 'ataque', label: 'Ataque' },
		{ key: 'defensa', label: 'Defensa' },
		{ key: 'ataque_especial', label: 'Ataque especial' },
		{ key: 'defensa_especial', label: 'Defensa especial' },
		{ key: 'velocidad', label: 'Velocidad' }
	];

	function getTodayKey() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const day = String(now.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	function pickFeatured(list) {
		if (!list?.length) return null;
		const index = Math.floor(Math.random() * list.length);
		return list[index];
	}

	async function loadFeaturedDetail(pokemonId) {
		featuredLoading = true;
		featuredError = '';

		try {
			const response = await fetch(`${API_URL}/pokemon/${pokemonId}`);
			if (!response.ok) {
				throw new Error(`Status ${response.status}`);
			}

			featuredDetail = await response.json();
		} catch (error) {
			featuredDetail = null;
			featuredError = 'No pudimos cargar mas datos del destacado.';
		} finally {
			featuredLoading = false;
		}
	}

	function updateFeatured() {
		if (!data?.pokemones?.length || typeof window === 'undefined') return;

		const today = getTodayKey();
		const savedDate = localStorage.getItem(FEATURED_DATE_KEY);
		const savedId = localStorage.getItem(FEATURED_ID_KEY);

		if (savedDate === today && savedId) {
			const found = data.pokemones.find((pokemon) => String(pokemon.id) === savedId);
			if (found) {
				featured = found;
				return;
			}
		}

		const selected = pickFeatured(data.pokemones);
		featured = selected;
		localStorage.setItem(FEATURED_DATE_KEY, today);
		if (selected) {
			localStorage.setItem(FEATURED_ID_KEY, String(selected.id));
			loadFeaturedDetail(selected.id);
		} else {
			featuredDetail = null;
		}
	}

	$effect(() => {
		updateFeatured();
	});

	onMount(() => {
		updateFeatured();
		const intervalId = setInterval(() => {
			updateFeatured();
		}, FEATURED_REFRESH_MS);

		return () => clearInterval(intervalId);
	});
</script>

<svelte:head>
	<title>IntroDex</title>
</svelte:head>

<div class="home-page">
	<section class="ui-section home-hero">
		<div class="ui-container home-featured-band">
			{#if featured}
				<div class="home-banner ui-card">
					<div class="home-banner__main">
						<div class="home-banner__copy">
							<div class="home-banner__heading">
								<span class="ui-pill">Destacado del dia</span>
								<p class="home-banner__refresh">Se renueva cada 24 horas.</p>
							</div>
							<h2>{featured.nombre}</h2>
							<div class="home-banner__types">
								{#each featured.tipos as tipo}
									<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
								{/each}
							</div>
							{#if featuredDetail}
								<div class="home-banner__quickfacts">
									<div>
										<span>Altura</span>
										<strong>{featuredDetail.altura}m</strong>
									</div>
									<div>
										<span>Peso</span>
										<strong>{featuredDetail.peso}kg</strong>
									</div>
									<div>
										<span>Habilidades</span>
										<strong>{featuredDetail.habilidades?.length || 0}</strong>
									</div>
								</div>

								<div class="home-banner__stats">
									{#each featuredStatFields as stat}
										{@const value = featuredDetail.estadisticas?.[stat.key] ?? 0}
										<div class="home-banner__stat">
											<span>{stat.label}</span>
											<strong>{value}</strong>
										</div>
									{/each}
								</div>

								{#if featuredDetail.movimientos_nivel?.length}
									<div class="home-banner__moves">
										<p class="home-banner__section-label">Ataques destacados</p>
										<div class="home-banner__movechips">
											{#each featuredDetail.movimientos_nivel.slice(0, 3) as movimiento}
												<span class="ui-chip">{movimiento.nombre}</span>
											{/each}
										</div>
									</div>
								{/if}
							{/if}
							{#if featuredError}
								<p class="home-banner__error">{featuredError}</p>
							{/if}
							<a href={`/pokemones/${featured.id}`} class="ui-button soft home-banner__cta">
								Ver detalles
							</a>
						</div>
						<div class="home-banner__media">
							{#if featuredLoading}
								<div class="home-banner__loading">Cargando ficha...</div>
							{:else}
								<img src={featured.imagen} alt={featured.nombre} />
							{/if}
						</div>
					</div>
				</div>
			{/if}
		</div>

		<div class="ui-container home-hero__grid">
			<div class="home-hero__copy">
				<p class="ui-kicker">IntroDex</p>
				<h1 class="ui-title">La data posta del mundo Pokemon, sin humo</h1>
				<p class="ui-subtitle">
					Todo en un solo lugar: fichas claras, movimientos al detalle y equipos que se arman al toque.
				</p>
				<div class="home-hero__cta">
					<a href="/pokemones" class="ui-button primary">Ir a Pokemon</a>
					<a href="/equipos" class="ui-button ghost">Armar equipo</a>
				</div>
			</div>
		</div>
	</section>

	<section class="ui-section home-random">
		<div class="ui-container">
			<PokemonAleatorio />
		</div>
	</section>
</div>
