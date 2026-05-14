<script>
  import { page } from '$app/stores';
  import { buscarPokemon } from '$lib/helpers/busqueda.js';
  import { showLoading } from '$lib/stores/loading.js';
  
  let menuCelular = $state(false);
  let textoBusqueda = $state('');
  
  const navegacion = [
    { nombre: 'Inicio', enlace: '/' },
    { nombre: 'Pokemon', enlace: '/pokemones' },
    { nombre: 'Movimientos', enlace: '/movimientos' },
    { nombre: 'Equipos', enlace: '/equipos' }
  ];

  function realizarBusqueda() {
    if (textoBusqueda.trim()) {
      buscarPokemon(textoBusqueda);
      menuCelular = false;
    }
  }

  function manejarEnter(event) {
    if (event.key === 'Enter') realizarBusqueda();
  }

  function navegarConLoading(nombre) {
    showLoading(`Abriendo ${nombre.toLowerCase()}...`);
    menuCelular = false;
  }
</script>

<header class="app-header">
  <div class="ui-container">
    <nav class="header-nav">
      <a href="/" class="brand">
        <span class="brand-mark">ID</span>
        <span class="brand-name">IntroDex</span>
      </a>

      <div class="nav-links">
        {#each navegacion as item}
          <a
            href={item.enlace}
            class="nav-link"
            class:active={$page.url.pathname === item.enlace}
            onclick={() => navegarConLoading(item.nombre)}
          >
            {item.nombre}
          </a>
        {/each}
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokemon..."
          class="search-input"
          bind:value={textoBusqueda}
          onkeydown={manejarEnter}
        />
        <button class="search-button" onclick={realizarBusqueda} aria-label="Buscar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <circle cx="11" cy="11" r="7"/>
            <line x1="16.5" y1="16.5" x2="22" y2="22"/>
          </svg>
        </button>
      </div>

      <button
        class="menu-toggle"
        onclick={() => (menuCelular = !menuCelular)}
        aria-label="Abrir menu"
        aria-expanded={menuCelular}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
    </nav>

    {#if menuCelular}
      <div class="mobile-panel">
        {#each navegacion as item}
          <a
            href={item.enlace}
            class="mobile-link"
            class:active={$page.url.pathname === item.enlace}
            onclick={() => navegarConLoading(item.nombre)}
          >
            {item.nombre}
          </a>
        {/each}
        <div class="mobile-search">
          <input
            type="text"
            placeholder="Buscar Pokemon..."
            class="search-input"
            bind:value={textoBusqueda}
            onkeydown={manejarEnter}
          />
          <button class="search-button" onclick={realizarBusqueda} aria-label="Buscar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <circle cx="11" cy="11" r="7"/>
              <line x1="16.5" y1="16.5" x2="22" y2="22"/>
            </svg>
          </button>
        </div>
      </div>
    {/if}
  </div>
</header>
