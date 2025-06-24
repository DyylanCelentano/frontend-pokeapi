<script>
	import './tabla.css';
	// Informacion sobre snippetFila y @render (propios de Svelte): https://svelte.dev/docs/svelte/snippet
	let { encabezados, datos, snippetFila } = $props();
</script>

<table class="tabla">
	<thead>
		<tr>
			{#each encabezados as titulo}
				<th class="encabezado">{titulo}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each datos as entidad, index}
			{@render snippetFila(entidad, index)}
		{/each}
	</tbody>
</table>
