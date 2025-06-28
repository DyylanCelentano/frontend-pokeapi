<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	const dispatch = createEventDispatcher();

	//export let data;
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
				console.error('Error fetching results:', response.status, response.statusText);
				results = [];
				showDropdown = false;
				return;
			}

			const data = await response.json();
			results = data.results || data || []; // Manejar diferentes estructuras de respuesta
			showDropdown = results.length > 0;
		} catch (error) {
			console.error('Error in fetchResults:', error);
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

<div class="typeahead-container">
	<input
		class="typeahead-input"
		type="text"
		bind:value={query}
		oninput={onInput}
		onblur={handleBlur}
		{placeholder}
		autocomplete="off"
	/>

	{#if showDropdown}
		<div class="dropdown">
			{#each results as result}
				<div
					class="dropdown-item"
					role="button"
					tabindex="0"
					onmousedown={() => selectResult(result)}
				>
					{result.nombre}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.typeahead-container {
		position: relative;
		width: 100%;
	}

	.typeahead-input {
		width: 100%;
		height: 2.5rem; /* h-10 equivale a 40px */
		padding: 0.5rem 0.75rem; /* px-3 py-2 */
		border: 1px solid #cbd5e1; /* border-slate-300 */
		border-radius: 0.375rem; /* rounded-md */
		font-size: 0.875rem; /* text-sm */
		line-height: 1.25rem;
		transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
	}

	.typeahead-input:focus {
		outline: none;
		border-color: #3b82f6; /* focus:border-blue-500 */
		box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); /* focus:ring-2 focus:ring-blue-500 */
	}

	.dropdown {
		position: absolute;
		width: 100%;
		max-height: 200px;
		overflow-y: auto;
		border: 1px solid #cbd5e1; /* border-slate-300 */
		border-top: none;
		border-radius: 0 0 0.375rem 0.375rem; /* rounded-b-md */
		background: white;
		z-index: 1000;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}

	.dropdown-item {
		padding: 0.5rem 0.75rem; /* px-3 py-2 */
		cursor: pointer;
		transition: background-color 0.15s ease-in-out;
		font-size: 0.875rem; /* text-sm */
		line-height: 1.25rem;
	}

	.dropdown-item:hover {
		background-color: #f1f5f9; /* hover:bg-slate-100 */
	}

	.dropdown-item:active {
		background-color: #e2e8f0; /* active:bg-slate-200 */
	}
</style>
