<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { showLoading } from '$lib/stores/loading.js';

	let { currentPage = 0, pageSize = 20, hasMore = true } = $props();

	function goToPage(newPage) {
		showLoading('Cambiando de pagina...');
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

<div class="pagination">
	{#if currentPage > 0}
		<button onclick={prevPage} class="ui-button ghost pagination-button">Anterior</button>
	{/if}

	<span class="pagination-info">
		<svg class="pagination-info__icon" viewBox="0 0 24 24" aria-hidden="true">
			<path
				d="M7 3a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5H7zm7 1.5V9h4.5"
				fill="currentColor"
			/>
		</svg>
		Pagina {currentPage + 1}
	</span>

	{#if hasMore}
		<button onclick={nextPage} class="ui-button primary pagination-button">Siguiente</button>
	{/if}
</div>
