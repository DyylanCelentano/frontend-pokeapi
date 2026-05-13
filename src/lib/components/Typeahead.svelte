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
		class="typeahead-input ui-input"
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
		height: 44px;
		padding: 0 0.9rem;
	}

	.typeahead-input:focus {
		box-shadow: 0 0 0 4px rgba(31, 138, 138, 0.12);
	}

	.dropdown {
		position: absolute;
		width: 100%;
		max-height: 200px;
		overflow-y: auto;
		border: 1px solid rgba(21, 23, 27, 0.14);
		border-radius: 0 0 14px 14px;
		background: rgba(255, 255, 255, 0.96);
		z-index: 1000;
		box-shadow: 0 20px 40px rgba(19, 20, 23, 0.12);
	}

	.dropdown-item {
		padding: 0.65rem 0.9rem;
		cursor: pointer;
		transition: background-color 0.15s ease-in-out;
		font-size: 0.875rem;
	}

	.dropdown-item:hover {
		background-color: rgba(31, 138, 138, 0.08);
	}

	.dropdown-item:active {
		background-color: rgba(31, 138, 138, 0.16);
	}
</style>
