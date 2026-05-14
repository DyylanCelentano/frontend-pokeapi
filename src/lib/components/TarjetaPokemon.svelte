<script lang="ts">
        import { goto } from '$app/navigation';
        import { showLoading } from '$lib/stores/loading.js';
        import EtiquetaTipo from './EtiquetaTipo.svelte';

        let { pokemon } = $props();

        function verDetalles() {
                showLoading('Cargando info del Pokemon...');
                goto(`/pokemones/${pokemon.id}`);
        }
</script>

<div class="pokemon-card ui-card" onclick={verDetalles} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && verDetalles()}>
        <div class="pokemon-card__media">
                <div class="pokemon-card__id">#{String(pokemon.id).padStart(3, '0')}</div>
                <img
                        src={pokemon.imagen || `/placeholder.svg?height=120&width=120`}
                        alt={pokemon.nombre}
                        class="pokemon-card__image"
                        loading="lazy"
                />
        </div>

        <div class="pokemon-card__body">
                <h3 class="pokemon-card__name">{pokemon.nombre}</h3>
                <div class="pokemon-card__types">
                        {#each pokemon.tipos as tipo}
                                <EtiquetaTipo tipo={tipo.nombre} tamaño="sm" />
                        {/each}
                </div>
                <button onclick={(e) => { e.stopPropagation(); verDetalles(); }} class="ui-button soft">
                        Ver detalles
                </button>
        </div>
</div>
