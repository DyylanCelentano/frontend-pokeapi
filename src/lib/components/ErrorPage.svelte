<script>
	export let title = "Uh, algo salio mal";
	export let message = "No encontramos lo que buscabas";
	export let statusCode = 404;
	export let backUrl = "/";
	export let backText = "Volver al inicio";
	export let suggestions = [];
</script>

<div class="error-page">
	<div class="error-card">
		<div class="error-code">{statusCode}</div>
		<h1>{title}</h1>
		<p>{message}</p>

		{#if suggestions.length > 0}
			<div class="error-suggestions">
				<h2>Que podes hacer</h2>
				<ul>
					{#each suggestions as suggestion}
						<li>{suggestion}</li>
					{/each}
				</ul>
			</div>
		{/if}

		<div class="error-actions">
			<a href={backUrl} class="ui-button primary">{backText}</a>
			<button on:click={() => history.back()} class="ui-button ghost">Volver atras</button>
		</div>

		<div class="error-links">
			<a href="/pokemones">Pokemon</a>
			<a href="/movimientos">Movimientos</a>
			<a href="/equipos">Equipos</a>
		</div>
	</div>
</div>
