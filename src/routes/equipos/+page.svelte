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

<div class="min-h-screen bg-slate-50 text-lg py-8">
	<div class="max-w-7xl mx-auto px-4">
		<a
			href="../"
			class="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-md font-medium transition-colors mb-8"
			>◄ Menu Principal</a
		>

		<!-- Encabezado de la página -->
		<div class="text-center mb-8">
			<h1 class="text-4xl font-bold text-slate-800 mb-4">Seccion Equipos</h1>
			<h3 class="text-xl text-slate-600">
				Acá podes encontrar todos los equipos disponibles listados con su información
			</h3>
		</div>

		<!-- Formulario para crear equipo -->
		<div class="bg-white p-6 rounded-lg border border-slate-200 mb-8 shadow-sm">
			<h2 class="text-2xl font-semibold text-slate-800 mb-2">Crear Equipo</h2>
			<h6 class="text-sm text-slate-600 mb-4">PD: no puede haber nombres repetidos</h6>
			<form
				method="POST"
				action="?/create"
				class="space-y-4"
				use:enhance={() => {
					mostrarBannerEquipoCreado();
				}}
			>
				<label class="block">
					<span class="text-sm font-medium text-slate-700 block mb-1">Nombre:</span>
					<input
						name="nombre"
						autocomplete="off"
						required
						class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</label>
				<label class="block">
					<span class="text-sm font-medium text-slate-700 block mb-1">Generacion del Equipo:</span>
					<select
						name="id_generacion"
						required
						class="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
				</label>
				<button
					type="submit"
					class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
					>Guardar</button
				>
			</form>
			{#if exito}
				<div class="mt-4 p-3 bg-green-100 border border-green-300 rounded-md text-green-800">
					✅ Equipo creado con éxito
				</div>
			{/if}
		</div>
		<Pagination currentPage={data.currentPage} pageSize={data.pageSize} hasMore={data.hasMore} />
		<div class="overflow-x-auto">
			<table class="w-full text-base border-collapse bg-white rounded-lg border border-slate-200">
				<thead>
					<tr class="bg-slate-50">
						<th class="border border-slate-300 p-3 text-center font-semibold">Ir al Equipo</th>
						<th class="border border-slate-300 p-3 text-center font-semibold">Nombre del Equipo</th>
						<th class="border border-slate-300 p-3 text-center font-semibold"
							>Generacion del Equipo</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold"
							>Cantidad de Integrantes del Equipo</th
						>
						<th class="border border-slate-300 p-3 text-center font-semibold"
							>Eliminar este Equipo</th
						>
					</tr>
				</thead>
				<tbody>
					{#each equiposFiltrados as equipo}
						<tr class="hover:bg-slate-50 transition-colors">
							<td class="border border-slate-300 p-3 text-center">
								<a
									href="/equipos/{equipo.id}"
									class="inline-flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
								>
									<img
										src="https://img.icons8.com/ios-filled/24/ffffff/visible.png"
										alt="Ver Equipo"
									/>
								</a>
							</td>
							<td class="border border-slate-300 p-3 text-center">{equipo.nombre}</td>
							<td class="border border-slate-300 p-3 text-center">{equipo.generacion.nombre}</td>
							<td class="border border-slate-300 p-3 text-center">{equipo.cantidad_integrantes}</td>
							<td class="border border-slate-300 p-3 text-center">
								<form action="?/eliminar_equipo" method="POST">
									<input type="hidden" name="id_equipo" value={equipo.id} />
									<button
										><img
											src="https://img.icons8.com/emoji/24/red-circle-emoji.png"
											alt="boton eliminar a este equipo"
										/></button
									>
								</form>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="border border-slate-300 p-4 text-center text-slate-500"
								>Equipos no encontrados</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
