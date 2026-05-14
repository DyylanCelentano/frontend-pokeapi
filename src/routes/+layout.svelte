<script>
  import Encabezado from '$lib/components/Encabezado.svelte';
  import LoadingPokemon from '$lib/components/LoadingPokemon.svelte';
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { get } from 'svelte/store';
  import { hideLoading, isLoading, loadingMessage, showLoading } from '$lib/stores/loading.js';
  import '../app.css';
  
  let { children } = $props();

  beforeNavigate(() => {
    if (!get(isLoading)) {
      showLoading('Cargando seccion...');
    }
  });

  afterNavigate(() => {
    hideLoading();
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="app-shell">
  <Encabezado />

  <main class="app-main">
    <div class="ui-fade-in">
      {@render children?.()}
    </div>

    {#if $isLoading}
      <div class="loading-overlay">
        <div class="loading-card">
          <LoadingPokemon mensaje={$loadingMessage} />
        </div>
      </div>
    {/if}
  </main>

  <footer class="app-footer">
    <div class="ui-container">
      <div class="footer-grid">
        <div>
          <h4>IntroDex</h4>
          <p>Proyecto integrador académico.</p>
          <p>Universidad de Buenos Aires.</p>
        </div>
        <div>
          <h5>Explorar</h5>
          <div class="footer-links">
            <a href="/pokemones">Pokemones</a>
            <a href="/movimientos">Movimientos</a>
            <a href="/equipos">Equipos</a>
          </div>
        </div>
        <div>
          <h5>Recursos</h5>
          <p>Datos provistos por API armada <br>con Python + FastAPI + SQLite.</p>
        </div>
      </div>
    </div>
  </footer>
</div>
