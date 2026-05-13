<script>
	export let type = "pokémon"; // pokémon, movimientos, equipos
	export let title = "";
	export let message = "";
	export let searchTerm = "";
	export let hasFilters = false;
	export let icon = "";
	export let suggestions = [];

	const typeNames = {
		pokémon: { singular: "Pokémon", plural: "Pokémon" },
		movimientos: { singular: "movimiento", plural: "movimientos" },
		equipos: { singular: "equipo", plural: "equipos" }
	};

	$: displayTitle = title || (searchTerm ? `No encontramos ${typeNames[type]?.plural || type}` : `Todavia sin ${typeNames[type]?.plural || type}`);
	$: displayMessage = message || (searchTerm ? 
		`No hay ${typeNames[type]?.plural || type} que coincidan con "${searchTerm}"` : 
		`Por ahora no hay ${typeNames[type]?.plural || type} para mostrar.`
	);
</script>

<div class="empty-state">
	{#if icon}
		<div class="empty-state__icon">{icon}</div>
	{/if}
	<div class="empty-state__mark" aria-hidden="true"></div>

	<h3 class="empty-state__title">{displayTitle}</h3>
	<p class="empty-state__message">{displayMessage}</p>

	{#if suggestions.length > 0}
		<div class="empty-state__suggestions">
			<h4>Para probar</h4>
			<ul>
				{#each suggestions as suggestion}
					<li>{suggestion}</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="empty-state__actions">
		{#if searchTerm || hasFilters}
			<button
				onclick={() => {
					document.querySelector('form')?.reset();
					window.location.href = window.location.pathname;
				}}
				class="ui-button primary"
			>
				Limpiar filtros
			</button>
		{/if}
		<button onclick={() => window.location.reload()} class="ui-button ghost">
			Recargar pagina
		</button>
	</div>
</div>
