<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { API_URL } from '$lib/constantes/index.js';
	import EtiquetaTipo from '$lib/components/EtiquetaTipo.svelte';
	import PokemonAleatorio from '$lib/components/PokemonAleatorio.svelte';
	import { showLoading } from '$lib/stores/loading.js';

	let { data } = $props();
	let featured = $state(null);
	let featuredDetail = $state(null);
	let featuredLoading = $state(true);
	let featuredError = $state('');

	const FEATURED_DATE_KEY = 'introdex-featured-date';
	const FEATURED_ID_KEY = 'introdex-featured-id';
	const FEATURED_REFRESH_MS = 24 * 60 * 60 * 1000;

	const statFields = [
		{ key: 'puntos_de_golpe', label: 'HP' },
		{ key: 'ataque', label: 'Ataque' },
		{ key: 'defensa', label: 'Defensa' },
		{ key: 'ataque_especial', label: 'Atq. Esp' },
		{ key: 'defensa_especial', label: 'Def. Esp' },
		{ key: 'velocidad', label: 'Velocidad' }
	];

	function getTodayKey() {
		const now = new Date();
		return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
	}

	function pickFeatured(list) {
		if (!list?.length) return null;
		return list[Math.floor(Math.random() * list.length)];
	}

	function getStatGradient(value) {
		if (value >= 100) return 'linear-gradient(90deg, #0ea5e9, #06b6d4)';
		if (value >= 75) return 'linear-gradient(90deg, #10b981, #0ea5e9)';
		if (value >= 50) return 'linear-gradient(90deg, #f59e0b, #f97316)';
		return 'linear-gradient(90deg, #ef4444, #f97316)';
	}

	async function loadFeaturedDetail(pokemonId) {
		featuredLoading = true;
		featuredError = '';
		try {
			const response = await fetch(`${API_URL}/pokemon/${pokemonId}`);
			if (!response.ok) throw new Error(`Status ${response.status}`);
			featuredDetail = await response.json();
		} catch (error) {
			featuredDetail = null;
			featuredError = 'No pudimos cargar los datos del destacado.';
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
			const found = data.pokemones.find((p) => String(p.id) === savedId);
			if (found) {
				featured = found;
				loadFeaturedDetail(found.id);
				return;
			}
		}

		const selected = pickFeatured(data.pokemones);
		featured = selected;
		if (selected) {
			localStorage.setItem(FEATURED_DATE_KEY, today);
			localStorage.setItem(FEATURED_ID_KEY, String(selected.id));
			loadFeaturedDetail(selected.id);
		} else {
			featuredLoading = false;
		}
	}

	function irAlDetalle() {
		if (featured) {
			showLoading('Cargando ficha del Pokemon...');
			goto(`/pokemones/${featured.id}`);
		}
	}

	$effect(() => {
		updateFeatured();
	});

	onMount(() => {
		const intervalId = setInterval(updateFeatured, FEATURED_REFRESH_MS);
		return () => clearInterval(intervalId);
	});
</script>

<svelte:head>
	<title>IntroDex — Pokémon</title>
</svelte:head>

<div class="home-page">
	<!-- ── Hero: title + Destacado del Día ───────────────── -->
	<section class="home-hero-v2">
		<div class="home-hero-v2__bg">
			<div class="home-hero-v2__blob home-hero-v2__blob--1"></div>
			<div class="home-hero-v2__blob home-hero-v2__blob--2"></div>
			<div class="home-hero-v2__blob home-hero-v2__blob--3"></div>
		</div>

		<div class="ui-container home-hero-v2__grid">
			<!-- Left: copy -->
			<div class="home-hero-v2__copy">
				<div class="home-hero-v2__kicker">
					<span class="home-hero-v2__kicker-dot"></span>
					<span>La enciclopedia definitiva</span>
				</div>

				<h1 class="home-hero-v2__title">
					La data posta del <em>mundo</em>
					<span class="home-hero-v2__gradient">Pokémon</span>
				</h1>

				<p class="home-hero-v2__subtitle">
					Fichas claras, movimientos al detalle y equipos que se arman al toque. Todo centralizado.
				</p>

				<div class="home-hero-v2__actions">
					<a href="/pokemones" class="ui-button primary">Explorar Pokémon</a>
					<a href="/equipos" class="ui-button ghost">Armar equipo</a>
				</div>
			</div>

			<!-- Right: Destacado del Día -->
			<div class="home-featured-v2">
				<div class="home-featured-v2__topbar"></div>

				<div class="home-featured-v2__header">
					<div class="home-featured-v2__badge">
						<span class="home-featured-v2__badge-dot"></span>
						<span class="home-featured-v2__badge-label">Destacado del día</span>
					</div>
					<div class="home-featured-v2__refresh">
						<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
							<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
						</svg>
						Cada 24h
					</div>
				</div>

				{#if featuredLoading && !featured}
					<div class="home-featured-v2__skeleton">
						<div class="home-featured-v2__skel-block" style="height:160px; border-radius:16px;"></div>
						<div class="home-featured-v2__skel-block" style="height:24px; width:60%; margin:0 auto;"></div>
						<div class="home-featured-v2__skel-block" style="height:16px; width:40%; margin:0 auto;"></div>
						<div class="home-featured-v2__skel-block" style="height:80px;"></div>
						<div class="home-featured-v2__skel-block" style="height:120px;"></div>
					</div>
				{:else if featuredError && !featured}
					<div class="home-featured-v2__error">{featuredError}</div>
				{:else if featured}
					<!-- Pokemon image -->
					<div class="home-featured-v2__image-area">
						<div class="home-featured-v2__glow"></div>
						<img
							src={featured.imagen}
							alt={featured.nombre}
							class="home-featured-v2__image"
						/>
					</div>

					<!-- Name + types -->
					<div class="home-featured-v2__name-area">
						<div class="home-featured-v2__meta">
							<span class="home-featured-v2__id">#{String(featured.id).padStart(3, '0')}</span>
							{#each featured.tipos as tipo}
								<EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
							{/each}
						</div>
						<h2 class="home-featured-v2__name">{featured.nombre}</h2>
					</div>

					{#if featuredDetail}
						<!-- Quick facts row -->
						<div class="home-featured-v2__quickfacts">
							<div class="home-featured-v2__fact">
								<span class="home-featured-v2__fact-label">Altura</span>
								<span class="home-featured-v2__fact-value">{featuredDetail.altura}m</span>
							</div>
							<div class="home-featured-v2__fact">
								<span class="home-featured-v2__fact-label">Peso</span>
								<span class="home-featured-v2__fact-value">{featuredDetail.peso}kg</span>
							</div>
							<div class="home-featured-v2__fact">
								<span class="home-featured-v2__fact-label">Habs.</span>
								<span class="home-featured-v2__fact-value">{featuredDetail.habilidades?.length ?? 0}</span>
							</div>
						</div>

						<!-- Stats -->
						<div class="home-featured-v2__stats">
							{#each statFields as stat}
								{@const value = featuredDetail.estadisticas?.[stat.key] ?? 0}
								{@const pct = Math.min((value / 150) * 100, 100)}
								<div class="home-featured-v2__stat">
									<span class="home-featured-v2__stat-label">{stat.label}</span>
									<span class="home-featured-v2__stat-value">{value}</span>
									<div class="home-featured-v2__stat-bar">
										<div
											class="home-featured-v2__stat-fill"
											style="width:{pct}%; background:{getStatGradient(value)};"
										></div>
									</div>
								</div>
							{/each}
						</div>

						<!-- Moves -->
						{#if featuredDetail.movimientos_nivel?.length}
							<div class="home-featured-v2__moves">
								<span class="home-featured-v2__moves-label">Ataques destacados</span>
								<div class="home-featured-v2__move-chips">
									{#each featuredDetail.movimientos_nivel.slice(0, 3) as mov}
										<span class="home-featured-v2__move-chip">{mov.nombre}</span>
									{/each}
								</div>
							</div>
						{/if}
					{/if}

					<!-- CTA -->
					<div class="home-featured-v2__cta">
						<button onclick={irAlDetalle} class="home-featured-v2__cta-btn">
							Ver ficha completa
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
								<polyline points="9 18 15 12 9 6"/>
							</svg>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</section>

	<!-- ── Zona Random ───────────────────────────────────── -->
	<section class="ui-section home-random">
		<div class="ui-container">
			<PokemonAleatorio />
		</div>
	</section>
</div>
