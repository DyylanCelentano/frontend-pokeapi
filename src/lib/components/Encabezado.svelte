<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { buscarPokemon } from '$lib/helpers/busqueda.js';
  import { showLoading } from '$lib/stores/loading.js';
  
  let menuCelular = $state(false);
  let textoBusqueda = $state('');
  let theme = $state('light');
  
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
    if (event.key === 'Enter') {
      realizarBusqueda();
    }
  }

  function aplicarTheme(nuevoTheme) {
    theme = nuevoTheme;
    document.documentElement.dataset.theme = nuevoTheme;
    localStorage.setItem('introdex-theme', nuevoTheme);
  }

  function toggleTheme() {
    aplicarTheme(theme === 'dark' ? 'light' : 'dark');
  }

  function navegarConLoading(mensaje) {
    showLoading(mensaje);
    menuCelular = false;
  }

  onMount(() => {
    const saved = localStorage.getItem('introdex-theme');
    if (saved) {
      aplicarTheme(saved);
      return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    aplicarTheme(prefersDark ? 'dark' : 'light');
  });
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
            onclick={() => navegarConLoading(`Abriendo ${item.nombre.toLowerCase()}...`)}
          >
            {item.nombre}
          </a>
        {/each}
      </div>

      <div class="search-bar">
        <input
          type="text"
          placeholder="Buscar Pokemon por nombre"
          class="search-input"
          bind:value={textoBusqueda}
          onkeydown={manejarEnter}
        />
        <button class="search-button" onclick={realizarBusqueda} aria-label="Buscar">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M11 4a7 7 0 105.29 12.1l3.3 3.3a1 1 0 001.42-1.4l-3.3-3.3A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <button class="theme-toggle" onclick={toggleTheme} aria-label="Cambiar tema">
        {#if theme === 'dark'}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a5 5 0 100-10 5 5 0 000 10zm0 4a1 1 0 011-1v-2a1 1 0 10-2 0v2a1 1 0 001 1zM4.22 5.64a1 1 0 011.41-1.41l1.42 1.41A1 1 0 115.64 7.05L4.22 5.64zM16.95 18.36a1 1 0 011.41 1.41l-1.41 1.42a1 1 0 11-1.41-1.41l1.41-1.42zM2 13a1 1 0 110-2h2a1 1 0 110 2H2zm18 0a1 1 0 110-2h2a1 1 0 110 2h-2zM5.64 18.36a1 1 0 10-1.41 1.41l1.42 1.42a1 1 0 001.41-1.41l-1.42-1.42zm13.73-12.72a1 1 0 10-1.41-1.41l-1.42 1.41a1 1 0 101.41 1.41l1.42-1.41z" fill="currentColor" />
          </svg>
        {:else}
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor" />
          </svg>
        {/if}
      </button>

      <button
        class="menu-toggle"
        onclick={() => menuCelular = !menuCelular}
        aria-label="Abrir menu"
        aria-expanded={menuCelular}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
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
            onclick={() => navegarConLoading(`Abriendo ${item.nombre.toLowerCase()}...`)}
          >
            {item.nombre}
          </a>
        {/each}
        <div class="mobile-search">
          <input
            type="text"
            placeholder="Buscar Pokemon"
            class="search-input"
            bind:value={textoBusqueda}
            onkeydown={manejarEnter}
          />
          <button class="search-button" onclick={realizarBusqueda} aria-label="Buscar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M11 4a7 7 0 105.29 12.1l3.3 3.3a1 1 0 001.42-1.4l-3.3-3.3A7 7 0 0011 4zm0 2a5 5 0 110 10 5 5 0 010-10z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <button class="theme-toggle mobile" onclick={toggleTheme} aria-label="Cambiar tema">
          {#if theme === 'dark'}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a5 5 0 100-10 5 5 0 000 10zm0 4a1 1 0 011-1v-2a1 1 0 10-2 0v2a1 1 0 001 1zM4.22 5.64a1 1 0 011.41-1.41l1.42 1.41A1 1 0 115.64 7.05L4.22 5.64zM16.95 18.36a1 1 0 011.41 1.41l-1.41 1.42a1 1 0 11-1.41-1.41l1.41-1.42zM2 13a1 1 0 110-2h2a1 1 0 110 2H2zm18 0a1 1 0 110-2h2a1 1 0 110 2h-2zM5.64 18.36a1 1 0 10-1.41 1.41l1.42 1.42a1 1 0 001.41-1.41l-1.42-1.42zm13.73-12.72a1 1 0 10-1.41-1.41l-1.42 1.41a1 1 0 101.41 1.41l1.42-1.41z" fill="currentColor" />
            </svg>
          {:else}
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor" />
            </svg>
          {/if}
        </button>
      </div>
    {/if}
  </div>
</header>
