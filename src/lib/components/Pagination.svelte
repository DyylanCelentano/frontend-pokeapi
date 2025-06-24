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

<div class="flex gap-6 text-lg text-slate-800 items-center">
	{#if currentPage > 0}
		<button onclick={prevPage} class="boton-primario rounded-xl py-1.5 px-2.5 cursor-pointer"
			>Anterior</button
		>
	{/if}

	<span class="page-info">
		Página {currentPage + 1}
	</span>

	{#if hasMore}
		<button onclick={nextPage} class="boton-primario rounded-xl p-1.5 cursor-pointer"
			>Siguiente</button
		>
	{/if}
</div>
