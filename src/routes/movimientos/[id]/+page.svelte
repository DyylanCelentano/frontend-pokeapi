<script>
	let { data } = $props();
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
			<h1 class="text-4xl font-bold text-slate-800 mb-4">{data.movimiento.nombre}</h1>
		</div>

		<!-- Información del movimiento -->
		<div class="bg-slate-50 p-6 rounded-lg border border-slate-200 mb-8">
			<ul class="list-none p-0 m-0 flex flex-col gap-3">
				<li class="p-3 border-b border-slate-200 last:border-b-0">
					<b>Generacion del Movimiento: </b>
					{data.movimiento.generacion.nombre}
				</li>
				<li class="p-3 border-b border-slate-200 last:border-b-0">
					<b>Tipo del Movimiento: </b>{data.movimiento.tipo.nombre}
				</li>
				<li class="p-3 border-b border-slate-200 last:border-b-0">
					<b>Categoria: </b>{data.movimiento.categoria}
				</li>
				<li class="p-3 border-b border-slate-200 last:border-b-0">
					<b>Potencia: </b>{data.movimiento.potencia}
				</li>
				<li class="p-3 border-b border-slate-200 last:border-b-0">
					<b>Precision: </b>{data.movimiento.precision}
				</li>
				<li class="p-3 border-b border-slate-200 last:border-b-0">
					<b>Puntos de Poder: </b>{data.movimiento.puntos_de_poder}
				</li>
				<li class="p-3"><b>Efecto: </b>{data.movimiento.efecto}</li>
			</ul>
		</div>

		<h3 class="text-2xl font-semibold text-slate-800 mt-8 mb-4">
			Pokemones que aprenden {data.movimiento.nombre} por Huevo
		</h3>
		<div class="overflow-x-auto mb-8">
			<table class="w-full text-base border-collapse">
				<thead>
					<tr class="bg-slate-50">
						<th class="border border-slate-300 p-2 text-center font-semibold">Nombre del Pokemon</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Altura del Pokemon (metros)</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Peso del Pokemon (kilogramos)</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Asi se ve el Pokemon</th
						>
					</tr>
				</thead>
				<tbody>
					{#each data.movimiento.pokemon_por_huevo as pokemon}
						<tr class="hover:bg-slate-50 transition-colors">
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.nombre}</td>
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.altura}</td>
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.peso}</td>
							<td class="border border-slate-300 p-0 text-center w-2/5">
								<a href="/pokemones/{pokemon.id}">
									<img
										src={pokemon.imagen}
										alt={pokemon.nombre}
										class="block mx-auto h-auto max-w-[100px] transition-all duration-200 hover:bg-slate-50 hover:rounded-full hover:border-4 hover:border-white"
									/>
								</a>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="border border-slate-300 p-4 text-center text-slate-500"
								>No Hay Pokemones que aprendan este movimiento por Huevo</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<h3 class="text-2xl font-semibold text-slate-800 mt-8 mb-4">
			Pokemones que aprenden {data.movimiento.nombre} por Maquina
		</h3>
		<div class="overflow-x-auto mb-8">
			<table class="w-full text-base border-collapse">
				<thead>
					<tr class="bg-slate-50">
						<th class="border border-slate-300 p-2 text-center font-semibold">Nombre del Pokemon</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Altura del Pokemon (metros)</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Peso del Pokemon (kilogramos)</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Asi se ve el Pokemon</th
						>
					</tr>
				</thead>
				<tbody>
					{#each data.movimiento.pokemon_por_maquina as pokemon}
						<tr class="hover:bg-slate-50 transition-colors">
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.nombre}</td>
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.altura}</td>
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.peso}</td>
							<td class="border border-slate-300 p-0 text-center w-2/5">
								<a href="/pokemones/{pokemon.id}">
									<img
										src={pokemon.imagen}
										alt={pokemon.nombre}
										class="block mx-auto h-auto max-w-[100px] transition-all duration-200 hover:bg-slate-50 hover:rounded-full hover:border-4 hover:border-white"
									/>
								</a>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="border border-slate-300 p-4 text-center text-slate-500"
								>No Hay Pokemones que aprendan este movimiento por Maquina</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<h3 class="text-2xl font-semibold text-slate-800 mt-8 mb-4">
			Pokemones que aprenden {data.movimiento.nombre} por Nivel
		</h3>
		<div class="overflow-x-auto mb-8">
			<table class="w-full text-base border-collapse">
				<thead>
					<tr class="bg-slate-50">
						<th class="border border-slate-300 p-2 text-center font-semibold">Nombre del Pokemon</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Altura del Pokemon (metros)</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Peso del Pokemon (kilogramos)</th
						>
						<th class="border border-slate-300 p-2 text-center font-semibold"
							>Asi se ve el Pokemon</th
						>
					</tr>
				</thead>
				<tbody>
					{#each data.movimiento.pokemon_por_nivel as pokemon}
						<tr class="hover:bg-slate-50 transition-colors">
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.nombre}</td>
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.altura}</td>
							<td class="border border-slate-300 p-2 text-center w-1/5">{pokemon.peso}</td>
							<td class="border border-slate-300 p-0 text-center w-2/5">
								<a href="/pokemones/{pokemon.id}">
									<img
										src={pokemon.imagen}
										alt={pokemon.nombre}
										class="block mx-auto h-auto max-w-[100px] transition-all duration-200 hover:bg-slate-50 hover:rounded-full hover:border-4 hover:border-white"
									/>
								</a>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="4" class="border border-slate-300 p-4 text-center text-slate-500"
								>No Hay Pokemones que aprendan este movimiento por Nivel</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
