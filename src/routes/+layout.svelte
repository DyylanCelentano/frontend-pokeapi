<script>
  import Encabezado from '$lib/components/Encabezado.svelte';
  import '../app.css';
  
  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col">
  <!-- Header -->
  <Encabezado />


  <!-- Contenido principal -->
  <main class="flex-1">
    {@render children?.()}
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
