<script>
  import Encabezado from '$lib/components/Encabezado.svelte';
  import LoadingPokemon from '$lib/components/LoadingPokemon.svelte';
  import { isLoading, loadingMessage } from '$lib/stores/loading.js';
  import '../app.css';
  
  let { children } = $props();
  
  // Debug: observar cambios en el store
  $effect(() => {
    console.log('Estado de loading:', $isLoading, 'Mensaje:', $loadingMessage);
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="min-h-screen flex flex-col overflow-x-hidden bg-gray-800">
  <!-- Header -->
  <Encabezado />


  <!-- Contenido principal -->
  <main class="flex-1 relative overflow-x-hidden">
    {@render children?.()}
    
    <!-- Loading overlay -->
    {#if $isLoading}
      <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 shadow-2xl">
          <LoadingPokemon mensaje={$loadingMessage} />
        </div>
      </div>
    {/if}
  </main>

  <footer class="bg-slate-800 text-white py-12 mt-12">

    <div class="max-w-7xl mx-auto px-16"> <!-- Contenido del footer -->

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"> <!-- grid -->
      
        <div class="md:col-span-1"> <!-- Parte izquierda -->
          <h4 class="text-lg font-semibold mb-4 text-white">IntroDex</h4>
          <p class="text-slate-400 mb-2">Proyecto Integrador Académico</p>
          <p class="text-slate-400 mb-2">Introducción al Desarrollo de Software</p>
          <p class="text-slate-400">Universidad de Buenos Aires</p>
        </div> <!-- Parte izquierda -->
        
        <div> <!-- Medio -->
          <h5 class="text-base font-semibold mb-4 text-white">Explorar</h5>
          <ul class="space-y-2">
            <li><a href="/pokemones" class="text-slate-400 hover:text-white transition-colors">Pokémon</a></li>
            <li><a href="/movimientos" class="text-slate-400 hover:text-white transition-colors">Movimientos</a></li>
            <li><a href="/equipos" class="text-slate-400 hover:text-white transition-colors">Equipos</a></li>
          </ul>
        </div> <!-- Medio -->


      </div> <!-- grid -->
      
    </div> <!-- Contenido del footer -->

  </footer>


</div>
