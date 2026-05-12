<script>
	import { enhance } from '$app/forms';
	import Pagination from '$lib/components/Pagination.svelte';
	export let data;

	let search = '';
	let exito = false;
	let error = '';

	$: equiposFiltrados = data.equipos.filter((m) =>
		m.nombre.toLowerCase().includes(search.toLowerCase())
	);
	
	function mostrarBannerEquipoCreado() {
		exito = true;
		setTimeout(() => {
			exito = false;
		}, 3000);
	}
</script>

<svelte:head>
	<title>Equipos - IntroDex</title>
</svelte:head>

<div class="min-h-screen bg-[var(--color-bg-primary)] py-8">
	<main class="flex-1">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<!-- Back button -->
			<a href="/" class="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-8 text-sm">
				<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<polyline points="15,18 9,12 15,6"/>
				</svg>
				Menu Principal
			</a>
			
			<!-- Page header -->
			<div class="mb-10">
				<h1 class="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-3">Equipos Pokemon</h1>
				<p class="text-[var(--color-text-secondary)]">
					Crea, explora y gestiona tus equipos favoritos
				</p>
			</div>
			
			<!-- Create team form -->
			<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 mb-8 max-w-xl">
				<h2 class="text-lg font-semibold text-[var(--color-text-primary)] mb-1 flex items-center gap-2">
					<svg class="w-5 h-5 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10"/>
						<line x1="12" y1="8" x2="12" y2="16"/>
						<line x1="8" y1="12" x2="16" y2="12"/>
					</svg>
					Crear Equipo
				</h2>
				<p class="text-sm text-[var(--color-text-muted)] mb-4">No puede haber nombres repetidos</p>
				
				<form
					method="POST"
					action="?/create"
					class="space-y-4"
					use:enhance={() => {
						mostrarBannerEquipoCreado();
					}}
				>
					<div>
						<label for="nombre" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Nombre</label>
						<input
							id="nombre"
							name="nombre"
							autocomplete="off"
							required
							class="w-full px-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
							placeholder="Nombre del equipo"
						/>
					</div>
					<div>
						<label for="id_generacion" class="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Generacion del Equipo</label>
						<select
							id="id_generacion"
							name="id_generacion"
							required
							class="w-full px-4 py-2.5 bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
						>
							<option value="">-- Seleccionar --</option>
							<option value="1">Generacion I</option>
							<option value="2">Generacion II</option>
							<option value="3">Generacion III</option>
							<option value="4">Generacion IV</option>
							<option value="5">Generacion V</option>
							<option value="6">Generacion VI</option>
							<option value="7">Generacion VII</option>
							<option value="8">Generacion VIII</option>
						</select>
					</div>
					<button
						type="submit"
						class="px-5 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-medium transition-colors text-sm"
					>
						Guardar Equipo
					</button>
				</form>
				
				{#if exito}
					<div class="mt-4 p-3 bg-[var(--color-success)]/10 border border-[var(--color-success)]/30 rounded-lg text-[var(--color-success)] text-sm font-medium flex items-center gap-2 animate-fade-in">
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
							<polyline points="20,6 9,17 4,12"/>
						</svg>
						Equipo creado con exito
					</div>
				{/if}
			</div>

			<!-- Search and pagination -->
			<div class="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
				<div class="relative w-full sm:w-96">
					<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<circle cx="11" cy="11" r="8"/>
						<line x1="21" y1="21" x2="16.65" y2="16.65"/>
					</svg>
					<input
						type="text"
						placeholder="Buscar equipo por nombre..."
						bind:value={search}
						class="w-full pl-10 pr-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-muted)] transition-all"
					/>
				</div>
				<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
			</div>

			<!-- Teams grid -->
			{#if equiposFiltrados.length > 0}
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each equiposFiltrados as equipo}
						<div class="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden hover:border-[var(--color-border-focus)] hover:shadow-lg transition-all duration-200">
							<!-- Header -->
							<div class="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
								<h3 class="text-base font-semibold text-[var(--color-text-primary)]">
									{equipo.nombre}
								</h3>
								<span class="px-2.5 py-1 bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] text-xs rounded-md">
									{equipo.generacion.nombre}
								</span>
							</div>
							
							<!-- Stats -->
							<div class="p-4">
								<div class="flex items-center justify-between mb-4">
									<div class="text-center">
										<div class="text-2xl font-bold text-[var(--color-accent)]">
											{equipo.cantidad_integrantes}
										</div>
										<div class="text-xs text-[var(--color-text-muted)]">Integrantes</div>
									</div>
									<div class="text-center">
										<div class="text-lg font-semibold text-[var(--color-text-secondary)]">
											{6 - equipo.cantidad_integrantes}
										</div>
										<div class="text-xs text-[var(--color-text-muted)]">Espacios libres</div>
									</div>
								</div>
								
								<!-- Progress bar -->
								<div class="mb-4">
									<div class="flex justify-between text-xs text-[var(--color-text-muted)] mb-1">
										<span>Equipo</span>
										<span>{equipo.cantidad_integrantes}/6</span>
									</div>
									<div class="w-full bg-[var(--color-bg-elevated)] rounded-full h-1.5">
										<div class="bg-[var(--color-accent)] h-1.5 rounded-full transition-all duration-300" style="width: {(equipo.cantidad_integrantes / 6) * 100}%"></div>
									</div>
								</div>
								
								<!-- Actions -->
								<div class="flex gap-2">
									<a
										href={`/equipos/${equipo.id}`}
										class="flex-1 bg-[var(--color-bg-hover)] hover:bg-[var(--color-accent)] text-[var(--color-text-secondary)] hover:text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm text-center"
									>
										Ver equipo
									</a>
									<form 
										action="?/eliminar_equipo" 
										method="POST" 
										class="flex-shrink-0"
										use:enhance={() => {}}
									>
										<input type="hidden" name="id_equipo" value={equipo.id} />
										<button
											type="submit"
											class="w-10 h-10 bg-[var(--color-error)]/10 hover:bg-[var(--color-error)]/20 text-[var(--color-error)] rounded-lg transition-colors flex items-center justify-center"
											title={`Eliminar equipo ${equipo.nombre}`}
										>
											<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
												<polyline points="3,6 5,6 21,6"/>
												<path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
											</svg>
										</button>
									</form>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<div class="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-12 text-center">
					<div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-bg-elevated)] flex items-center justify-center">
						<svg class="w-8 h-8 text-[var(--color-text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
							<circle cx="9" cy="7" r="4"/>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"/>
						</svg>
					</div>
					<h3 class="text-lg font-semibold text-[var(--color-text-primary)] mb-2">No hay equipos para mostrar</h3>
					<p class="text-sm text-[var(--color-text-muted)] mb-2">Crea tu primer equipo usando el formulario de arriba</p>
					<p class="text-sm text-[var(--color-text-muted)]">Todos los equipos creados apareceran aqui</p>
				</div>
			{/if}
		</div>
	</main>
</div>
