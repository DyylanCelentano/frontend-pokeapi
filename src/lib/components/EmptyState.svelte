<script>
	let { 
		type = "pokemon",
		title = "",
		message = "",
		searchTerm = "",
		hasFilters = false,
		suggestions = []
	} = $props();

	const typeNames = {
		pokemon: { singular: "Pokemon", plural: "Pokemon" },
		movimientos: { singular: "movimiento", plural: "movimientos" },
		equipos: { singular: "equipo", plural: "equipos" }
	};

	let displayTitle = $derived(title || (searchTerm ? `No se encontraron ${typeNames[type]?.plural || type}` : `Sin ${typeNames[type]?.plural || type}`));
	let displayMessage = $derived(message || (searchTerm ? 
		`No se encontraron ${typeNames[type]?.plural || type} que coincidan con "${searchTerm}"` : 
		`Parece que no hay ${typeNames[type]?.plural || type} para mostrar en este momento.`
	));
</script>

<div class="text-center py-16 px-6 bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border)]">
	<!-- Icon -->
	<div class="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center">
		<svg class="w-8 h-8 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
			<circle cx="11" cy="11" r="8"/>
			<line x1="21" y1="21" x2="16.65" y2="16.65"/>
			<line x1="8" y1="11" x2="14" y2="11"/>
		</svg>
	</div>

	<!-- Title -->
	<h3 class="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
		{displayTitle}
	</h3>

	<!-- Message -->
	<p class="text-[var(--color-text-secondary)] mb-6 max-w-md mx-auto text-sm leading-relaxed">
		{displayMessage}
	</p>

	<!-- Suggestions -->
	{#if suggestions.length > 0}
		<div class="mb-8 text-left max-w-md mx-auto">
			<h4 class="text-sm font-medium text-[var(--color-text-primary)] mb-3">Sugerencias:</h4>
			<ul class="space-y-2">
				{#each suggestions as suggestion}
					<li class="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
						<svg class="w-4 h-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="9,18 15,12 9,6"/>
						</svg>
						<span>{suggestion}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Action buttons -->
	<div class="flex flex-col sm:flex-row gap-3 justify-center">
		{#if searchTerm || hasFilters}
			<button
				onclick={() => {
					document.querySelector('form')?.reset();
					window.location.href = window.location.pathname;
				}}
				class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-medium rounded-lg transition-colors text-sm"
			>
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="23,4 23,10 17,10"/>
					<polyline points="1,20 1,14 7,14"/>
					<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
				</svg>
				Limpiar filtros
			</button>
		{/if}
		
		<button
			onclick={() => window.location.reload()}
			class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--color-bg-hover)] hover:bg-[var(--color-border-focus)] text-[var(--color-text-secondary)] font-medium rounded-lg transition-colors text-sm"
		>
			<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="23,4 23,10 17,10"/>
				<path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
			</svg>
			Actualizar pagina
		</button>
	</div>
</div>
