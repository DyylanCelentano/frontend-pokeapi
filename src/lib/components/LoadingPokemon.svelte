<script>
	let { mensaje = "Cargando..." } = $props();
</script>

<div class="flex flex-col items-center justify-center p-8 text-center">
	<!-- Modern spinner -->
	<div class="relative w-16 h-16 mb-6">
		<!-- Outer ring -->
		<div class="absolute inset-0 rounded-full border-2 border-[var(--color-border)]"></div>
		<!-- Spinning accent -->
		<div class="absolute inset-0 rounded-full border-2 border-transparent border-t-[var(--color-accent)] animate-spin"></div>
		<!-- Center dot -->
		<div class="absolute inset-0 flex items-center justify-center">
			<div class="w-3 h-3 rounded-full bg-[var(--color-accent)] animate-pulse"></div>
		</div>
	</div>
	
	<!-- Loading message -->
	<p class="text-base font-medium text-[var(--color-text-secondary)]">
		{mensaje}
	</p>
	
	<!-- Subtle dots -->
	<div class="flex gap-1.5 mt-4">
		<div class="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce" style="animation-delay: 0ms;"></div>
		<div class="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce" style="animation-delay: 150ms;"></div>
		<div class="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)] animate-bounce" style="animation-delay: 300ms;"></div>
	</div>
</div>
