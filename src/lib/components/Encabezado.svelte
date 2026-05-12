<script>
  import { page } from '$app/stores';
  import { buscarPokemon } from '$lib/helpers/busqueda.js';
  
  let menuCelular = $state(false);
  let textoBusqueda = $state('');
  
  const navegacion = [
    { nombre: 'Inicio', enlace: '/', icon: 'home' },
    { nombre: 'Pokemon', enlace: '/pokemones', icon: 'pokemon' },
    { nombre: 'Movimientos', enlace: '/movimientos', icon: 'moves' },
    { nombre: 'Equipos', enlace: '/equipos', icon: 'teams' }
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
</script>

<header class="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex items-center justify-between h-16">

      <!-- Logo -->
      <a href="/" class="flex items-center gap-3 group">
        <div class="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
          <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <span class="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
          IntroDex
        </span>
      </a>
      
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-1">
        {#each navegacion as item}
          <a 
            href={item.enlace} 
            class="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                   {$page.url.pathname === item.enlace 
                     ? 'text-[var(--color-text-primary)] bg-[var(--color-bg-hover)]' 
                     : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'}"
          >
            {item.nombre}
            {#if $page.url.pathname === item.enlace}
              <span class="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
            {/if}
          </a>
        {/each}
      </div>

      <!-- Search Bar -->
      <div class="hidden sm:flex items-center">
        <div class="relative">
          <div class="flex items-center bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg px-3 py-2 min-w-[240px] focus-within:border-[var(--color-accent)] focus-within:ring-2 focus-within:ring-[var(--color-accent-muted)] transition-all">
            <svg class="w-4 h-4 text-[var(--color-text-muted)] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar Pokemon..." 
              class="bg-transparent outline-none text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] flex-1 w-full"
              bind:value={textoBusqueda}
              onkeydown={manejarEnter}
            />
            {#if textoBusqueda}
              <button 
                class="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                onclick={() => textoBusqueda = ''}
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            {/if}
          </div>
        </div>
        <button 
          class="ml-2 p-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg transition-colors"
          onclick={realizarBusqueda}
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu Button -->
      <button 
        class="md:hidden p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] rounded-lg transition-colors"
        onclick={() => menuCelular = !menuCelular}
        aria-label="Toggle menu"
      >
        {#if menuCelular}
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        {:else}
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        {/if}
      </button>
    </nav>
    
    <!-- Mobile Navigation -->
    {#if menuCelular}
      <div class="md:hidden border-t border-[var(--color-border)] py-4 animate-fade-in">
        <div class="flex flex-col gap-1">
          {#each navegacion as item}
            <a 
              href={item.enlace}
              class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                     {$page.url.pathname === item.enlace 
                       ? 'text-[var(--color-text-primary)] bg-[var(--color-bg-hover)]' 
                       : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)]'}"
              onclick={() => menuCelular = false}
            >
              {item.nombre}
            </a>
          {/each}
        </div>
        
        <!-- Mobile Search -->
        <div class="mt-4 px-4">
          <div class="flex items-center bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg px-3 py-2">
            <svg class="w-4 h-4 text-[var(--color-text-muted)] mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input 
              type="text" 
              placeholder="Buscar Pokemon..." 
              class="bg-transparent outline-none text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] flex-1"
              bind:value={textoBusqueda}
              onkeydown={manejarEnter}
            />
            <button 
              class="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
              onclick={realizarBusqueda}
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</header>
