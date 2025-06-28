<script>
  import { page } from '$app/stores';
  import { buscarPokemon } from '$lib/helpers/busqueda.js';
  
  let menuCelular = $state(false);
  let textoBusqueda = $state('');
  
  const navegacion = [
    { nombre: 'Inicio', enlace: '/' },
    { nombre: 'Pokémon', enlace: '/pokemones' },
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
</script>

<header class="bg-white shadow-md border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <nav class="flex items-center justify-between h-16">

      <div class="flex items-center"> <!-- Logo y nombre -->
        <a href="/" class="flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors">

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1333.34 1333.07" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" class="w-6 h-6"><defs><style>.fil0{fill:#fff;fill-rule:nonzero}</style></defs><g id="Layer_x0020_1"><g id="_1473324886368"><path id="Down" class="fil0" d="M666.54 885.24c-105.31 0-193.15-74.56-214.01-173.61H102.19c24.77 288.04 266.41 514.04 560.7 514.04 294.3 0 536.2-226 560.7-514.04H880.55c-20.85 99.32-108.7 173.61-214.01 173.61z"/><path id="Shadow_Down" d="M791.66 1211.07c233.56-54.74 411.08-254.68 431.94-499.44h-138.16c-13.81 222.09-130.34 410.3-293.78 499.44z" fill="#dfdfdf" fill-rule="nonzero"/><path id="Center" class="fil0" d="M795.57 666.54c-.26 0-.26 0 0 0-.26-15.9-3.13-31.02-8.34-45.09-18.25-49.01-65.43-83.68-120.69-83.68-55.26 0-102.44 34.93-120.69 83.68a129.312 129.312 0 00-8.08 45.09h.26c0 15.9 2.87 31.02 8.08 45.09 18.25 49.01 65.43 83.68 120.69 83.68 55.26 0 102.44-34.93 120.69-83.68 5.21-13.82 8.08-29.19 8.08-45.09z"/><path id="Up" d="M666.8 448.09c105.31 0 193.15 74.56 214.01 173.61h350.34c-24.76-288.3-266.41-514.3-560.96-514.3-294.56 0-535.94 226-560.7 514.04h343.3c20.85-99.06 108.7-173.35 214.01-173.35z" fill="#ff1c1c" fill-rule="nonzero"/><path id="Shadow_Up" d="M1085.44 621.44h145.45C1209.52 372.5 1026 169.7 786.45 119.38c166.31 87.84 284.91 277.87 298.99 502.06z" fill="#df1818" fill-rule="nonzero"/><path id="Line" d="M670.19 107.4c294.56 0 536.2 226 560.7 514.04H880.55c-20.85-99.06-108.7-173.61-214.02-173.61-105.31 0-193.15 74.56-214.01 173.61H109.48c24.76-288.05 266.41-514.04 560.7-514.04zm117.04 514.04c5.21 14.07 8.08 29.19 8.08 45.09h.26c0 15.9-2.87 31.02-8.08 45.09-18.24 49.01-65.43 83.68-120.69 83.68-55.26 0-102.44-34.93-120.69-83.68a129.312 129.312 0 01-8.08-45.09h-.26c0-15.9 2.87-31.02 8.08-45.09 18.24-49.01 65.43-83.68 120.69-83.68 55.26 0 102.44 34.93 120.69 83.68zm-124.34 604.49c-294.56 0-536.2-226-560.7-514.04h350.34c20.85 99.05 108.7 173.61 214.01 173.61 105.31 0 193.16-74.56 214.02-173.61h343.3c-24.76 287.78-266.41 514.04-560.96 514.04zM666.54 0C298.47 0 0 298.46 0 666.54c0 368.07 298.47 666.54 666.54 666.54 368.07 0 666.8-298.21 666.8-666.54S1034.87 0 666.54 0z" fill="#000" fill-rule="nonzero"/></g></g></svg>
          
          <span class="text-blue-600">IntroDex</span>

        </a>

      </div> <!-- Logo y nombre -->
      
      <!-- Navegación computadoras -->
      <div class="hidden md:flex items-center gap-8">
        {#each navegacion as item}
          <a 
            href={item.enlace} 
            class="text-slate-600 hover:text-slate-900 font-medium transition-colors px-3 py-2 rounded-md"
            class:text-blue-600={$page.url.pathname === item.enlace}
            class:font-semibold={$page.url.pathname === item.enlace}
            class:bg-slate-100={$page.url.pathname === item.enlace}
          >
            {item.nombre}
          </a>
        {/each}
      </div>
        <!-- Barra de búsqueda -->
      <div class="hidden sm:flex items-center bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 min-w-[250px]">
        <input 
          type="text" 
          placeholder="Buscar Pokémon..." 
          class="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-500 flex-1 px-2"
          bind:value={textoBusqueda}
          onkeydown={manejarEnter}
        />
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md p-2 transition-colors"
          onclick={realizarBusqueda}
        >
          🔍
        </button>
      </div>
      
      <!-- Boton menu celular -->
      <button 
        class="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors text-xl"
        onclick={() => menuCelular = !menuCelular}
      >
        ☰
      </button>
    </nav>
    
    <!-- Navegación en celulares -->
    {#if menuCelular}
      <div class="md:hidden border-t border-slate-200 bg-white">
        {#each navegacion as item}
          <a 
            href={item.enlace}
            class="block px-4 py-3 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
            class:text-blue-600={$page.url.pathname === item.enlace}
            class:bg-blue-50={$page.url.pathname === item.enlace}
            onclick={() => menuCelular = false}
          >
            {item.nombre}
          </a>
        {/each}
          <!-- Barra de búsqueda en celular -->
        <div class="p-4 border-t border-slate-200">
          <div class="flex items-center bg-slate-100 rounded-lg px-3 py-2">
            <input 
              type="text" 
              placeholder="Buscar Pokémon..." 
              class="bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-500 flex-1"
              bind:value={textoBusqueda}
              onkeydown={manejarEnter}
            />
            <button 
              class="text-slate-500 hover:text-slate-700 ml-2"
              onclick={realizarBusqueda}
            >
              🔍
            </button>
          </div>
        </div>
      </div>
    {/if}
  </div>
</header>
