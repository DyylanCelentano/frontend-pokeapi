<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	const dispatch = createEventDispatcher();

	export let placeholder;
	export let endpoint;
	export let minQueryLength = 2;
	export let debounceTime = 300;
	let query = '';
	let results = [];
	let showDropdown = false;
	let timeout;

	function onInput() {
		clearTimeout(timeout);
		if (query.length < minQueryLength) {
			results = [];
			showDropdown = false;
			return;
		}
		timeout = setTimeout(fetchResults, debounceTime);
	}

	async function fetchResults() {
		try {
			let url = new URL(`${endpoint}`);
			let params = { nombre_parcial: query };
			url.search = new URLSearchParams(params).toString();

			const response = await fetch(url, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' }
			});
			
			if (!response.ok) {
				results = [];
				showDropdown = false;
				return;
			}

			const data = await response.json();
			results = data.results || data || [];
			showDropdown = results.length > 0;
		} catch (error) {
			results = [];
			showDropdown = false;
		}
	}

	function selectResult(result) {
		query = result.nombre;
		showDropdown = false;
		dispatch('select', { result });
	}

	function handleBlur() {
		setTimeout(() => (showDropdown = false), 150);
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<div class="relative w-full">
	<div class="relative">
		<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
			<circle cx="11" cy="11" r="8"/>
			<line x1="21" y1="21" x2="16.65" y2="16.65"/>
		</svg>
		<input
			class="w-full h-10 pl-10 pr-4 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
			type="text"
			bind:value={query}
			oninput={onInput}
			onblur={handleBlur}
			{placeholder}
			autocomplete="off"
		/>
	</div>

	{#if showDropdown}
		<div class="absolute w-full mt-1 max-h-52 overflow-y-auto bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg shadow-lg z-50">
			{#each results as result}
				<button
					class="w-full px-4 py-2.5 text-left text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors first:rounded-t-lg last:rounded-b-lg"
					onmousedown={() => selectResult(result)}
				>
					{result.nombre}
				</button>
			{/each}
		</div>
	{/if}
</div>
