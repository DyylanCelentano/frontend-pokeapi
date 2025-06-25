<script>
	export let title = "¡Opa! Parece que algo salió mal";
	export let message = "No pudimos encontrar lo que buscas";
	export let statusCode = 404;
	export let backUrl = "/";
	export let backText = "Volver al inicio";
	export let icon = "🔍";
	export let suggestions = [];
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
	<div class="max-w-lg w-full text-center">
		<!-- Icono y código de error -->
		<div class="mb-8">
			<div class="text-8xl mb-4">{icon}</div>
			<div class="text-6xl font-bold text-slate-800 mb-2">{statusCode}</div>
			<h1 class="text-2xl font-bold text-slate-800 mb-4">{title}</h1>
			<p class="text-slate-600 text-lg leading-relaxed">{message}</p>
		</div>

		<!-- Sugerencias si las hay -->
		{#if suggestions.length > 0}
			<div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
				<h2 class="text-sm font-semibold text-blue-800 mb-3">💡 ¿Qué puedes hacer?</h2>
				<ul class="text-sm text-blue-700 space-y-2 text-left">
					{#each suggestions as suggestion}
						<li class="flex items-start gap-2">
							<span class="text-blue-500 mt-0.5">•</span>
							<span>{suggestion}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- Botones de acción -->
		<div class="flex flex-col sm:flex-row gap-3 justify-center">
			<a
				href={backUrl}
				class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
			>
				<span>←</span>
				{backText}
			</a>
			
			<button
				on:click={() => history.back()}
				class="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition-colors"
			>
				<span>↶</span>
				Volver atrás
			</button>
		</div>

		<!-- Enlaces adicionales -->
		<div class="mt-8 pt-6 border-t border-slate-200">
			<p class="text-sm text-slate-500 mb-4">O explora estas secciones:</p>
			<div class="flex flex-wrap justify-center gap-4 text-sm">
				<a href="/pokemones" class="text-blue-600 hover:text-blue-800 transition-colors">🐾 Pokémones</a>
				<a href="/movimientos" class="text-blue-600 hover:text-blue-800 transition-colors">⚔️ Movimientos</a>
				<a href="/equipos" class="text-blue-600 hover:text-blue-800 transition-colors">👥 Equipos</a>
			</div>
		</div>
	</div>
</div>
