<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { currentPage = 0, pageSize = 20, hasMore = true } = $props();

	function goToPage(newPage) {
		const url = new URL($page.url);
		url.searchParams.set('page', newPage.toString());
		goto(url.toString());
	}

	function nextPage() {
		goToPage(currentPage + 1);
	}

	function prevPage() {
		goToPage(currentPage - 1);
	}
</script>

<div class="flex items-center justify-center gap-3">
	{#if currentPage > 0}
		<button 
			onclick={prevPage} 
			class="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-focus)] rounded-lg transition-all duration-200 text-sm font-medium"
		>
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15,18 9,12 15,6"/>
			</svg>
			Anterior
		</button>
	{/if}

	<div class="flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg">
		<span class="text-sm text-[var(--color-text-muted)]">Pagina</span>
		<span class="text-sm font-semibold text-[var(--color-text-primary)]">{currentPage + 1}</span>
	</div>

	{#if hasMore}
		<button 
			onclick={nextPage} 
			class="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg transition-all duration-200 text-sm font-medium"
		>
			Siguiente
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="9,18 15,12 9,6"/>
			</svg>
		</button>
	{/if}
</div>
