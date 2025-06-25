<script>
	export let type = "pokémon"; // pokémon, movimientos, equipos
	export let title = "";
	export let message = "";
	export let searchTerm = "";
	export let hasFilters = false;
	export let icon = "🔍";
	export let suggestions = [];

	const typeNames = {
		pokémon: { singular: "Pokémon", plural: "Pokémon" },
		movimientos: { singular: "movimiento", plural: "movimientos" },
		equipos: { singular: "equipo", plural: "equipos" }
	};

	$: displayTitle = title || (searchTerm ? `No se encontraron ${typeNames[type]?.plural || type}` : `Sin ${typeNames[type]?.plural || type}`);
	$: displayMessage = message || (searchTerm ? 
		`No se encontraron ${typeNames[type]?.plural || type} que coincidan con "${searchTerm}"` : 
		`Parece que no hay ${typeNames[type]?.plural || type} para mostrar en este momento.`
	);
</script>

<div class="text-center py-16 px-6 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
	<!-- Icono -->
	<div class="text-6xl mb-4 opacity-50">
		{icon}
	</div>

	<!-- Título -->
	<h3 class="text-2xl font-semibold text-slate-800 mb-3">
		{displayTitle}
	</h3>

	<!-- Mensaje -->
	<p class="text-slate-600 mb-6 max-w-md mx-auto">
		{displayMessage}
	</p>

	<!-- Sugerencias -->
	{#if suggestions.length > 0}
		<div class="mb-8">
			<h4 class="text-lg font-medium text-slate-700 mb-3">Sugerencias:</h4>
			<ul class="text-left text-slate-600 space-y-2 max-w-md mx-auto">
				{#each suggestions as suggestion}
					<li class="flex items-start gap-2">
						<span class="text-blue-500 font-bold">•</span>
						<span>{suggestion}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Botones de acción -->
	<div class="flex flex-col sm:flex-row gap-3 justify-center">
		{#if searchTerm || hasFilters}
			<button
				onclick={() => {
					document.querySelector('form')?.reset();
					window.location.href = window.location.pathname;
				}}
				class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
			>
				<span>🔄</span>
				Limpiar filtros
			</button>
		{/if}
		
		<button
			onclick={() => window.location.reload()}
			class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
		>
			<span>↻</span>
			Actualizar página
		</button>
	</div>
</div>
