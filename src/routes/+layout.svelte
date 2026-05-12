<script>
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import Encabezado from '$lib/components/Encabezado.svelte';
  import LoadingPokemon from '$lib/components/LoadingPokemon.svelte';
  import { isLoading, loadingMessage, showLoading, hideLoading } from '$lib/stores/loading.js';
  import '../app.css';
  
  let { children } = $props();
  let isNavigating = $state(false);
  
  // Page transition loading
  beforeNavigate(({ to }) => {
    if (to) {
      isNavigating = true;
      showLoading('Cargando...');
    }
  });
  
  afterNavigate(() => {
    isNavigating = false;
    hideLoading();
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="min-h-screen flex flex-col overflow-x-hidden bg-[var(--color-bg-primary)]">
  <Encabezado />

  <main class="flex-1 relative overflow-x-hidden">
    <div class="page-transition">
      {@render children?.()}
    </div>
    
    {#if $isLoading}
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
        <div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-8 shadow-2xl animate-fade-in-scale">
          <LoadingPokemon mensaje={$loadingMessage} />
        </div>
      </div>
    {/if}
  </main>

  <footer class="bg-[var(--color-bg-secondary)] border-t border-[var(--color-border)] py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
              <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <span class="text-lg font-semibold text-[var(--color-text-primary)]">IntroDex</span>
          </div>
          <p class="text-[var(--color-text-muted)] text-sm leading-relaxed max-w-sm">
            Proyecto Integrador Academico<br/>
            Introduccion al Desarrollo de Software<br/>
            Universidad de Buenos Aires
          </p>
        </div>
        
        <!-- Navigation -->
        <div>
          <h5 class="text-sm font-semibold text-[var(--color-text-primary)] mb-4 uppercase tracking-wider">Explorar</h5>
          <ul class="space-y-3">
            <li>
              <a href="/pokemones" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] text-sm transition-colors flex items-center gap-2 group">
                <svg class="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                Pokemon
              </a>
            </li>
            <li>
              <a href="/movimientos" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] text-sm transition-colors flex items-center gap-2 group">
                <svg class="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/>
                </svg>
                Movimientos
              </a>
            </li>
            <li>
              <a href="/equipos" class="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] text-sm transition-colors flex items-center gap-2 group">
                <svg class="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Equipos
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Bottom bar -->
      <div class="pt-8 border-t border-[var(--color-border)]">
        <p class="text-[var(--color-text-muted)] text-sm text-center">
          IntroDex - Proyecto academico UBA
        </p>
      </div>
    </div>
  </footer>
</div>
