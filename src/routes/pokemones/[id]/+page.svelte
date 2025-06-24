<script>
	import Tabla from '$lib/components/tabla/tabla.svelte';
	import CustomH1 from '$lib/components/titulo.svelte';
	let { data } = $props();

	const {
		id,
		nombre,
		imagen,
		altura,
		peso,
		generaciones,
		tipos,
		habilidades,
		estadisticas,
		evoluciones,
		movimientos_huevo: movimientosHuevo,
		movimientos_maquina: movimientosMaquina,
		movimientos_nivel: movimientosNivel
	} = data.pokemon;

	const {
		ataque,
		defensa,
		ataque_especial: ataqueEspecial,
		defensa_especial: defensaEspecial,
		puntos_de_golpe: puntosDeGolpe,
		velocidad
	} = estadisticas;
</script>

<div class="pokemon-detail max-w-4xl mx-auto px-4">
	<div class="header-section mb-8">
		<h1 class="text-4xl font-bold text-red-600 mb-4">{nombre}</h1>
		<img src={imagen} alt={`Imagen del pokemon ${nombre}`} class="w-72 mx-auto mb-4" />
		<div class="nav-links">
			<ul class="flex flex-col gap-4">
				<li>
					<a href="#goto-caracteristicas" class="text-blue-600 hover:underline">Caracteristicas</a>
				</li>
				<li>
					<a href="#goto-generaciones" class="text-blue-600 hover:underline">Generaciones</a>
				</li>
				<li>
					<a href="#goto-tipos" class="text-blue-600 hover:underline">Tipos</a>
				</li>
				<li>
					<a href="#goto-habilidades" class="text-blue-600 hover:underline">Habilidades</a>
				</li>
				<li>
					<a href="#goto-evoluciones" class="text-blue-600 hover:underline">Evoluciones</a>
				</li>
				<li>
					<a href="#goto-movimientos" class="text-blue-600 hover:underline">Movimientos</a>
					<ul class="ml-4 mt-2">
						<li>
							<a href="#goto-movimientos-huevo" class="text-blue-600 hover:underline">Por Huevo</a>
						</li>
						<li>
							<a href="#goto-movimientos-maquina" class="text-blue-600 hover:underline">Por Máquina</a>
						</li>
						<li>
							<a href="#goto-movimientos-nivel" class="text-blue-600 hover:underline">Por Nivel</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<div class="content">
		<section id="goto-caracteristicas">
			<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Características</h3>
			<div class="overflow-x-auto mb-8">
				<table class="w-full text-base border-collapse">
					<thead>
						<tr class="bg-gray-50">
							<th class="border border-gray-300 p-4 text-center font-semibold">Estadística</th>
							<th class="border border-gray-300 p-4 text-center font-semibold">Valor</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Altura (metros)</td>
							<td class="border border-gray-300 p-4 text-center">{altura}</td>
						</tr>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Peso (kilogramos)</td>
							<td class="border border-gray-300 p-4 text-center">{peso}</td>
						</tr>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Ataque</td>
							<td class="border border-gray-300 p-4 text-center">{ataque}</td>
						</tr>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Defensa</td>
							<td class="border border-gray-300 p-4 text-center">{defensa}</td>
						</tr>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Ataque especial</td>
							<td class="border border-gray-300 p-4 text-center">{ataqueEspecial}</td>
						</tr>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Defensa especial</td>
							<td class="border border-gray-300 p-4 text-center">{defensaEspecial}</td>
						</tr>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Puntos de golpe</td>
							<td class="border border-gray-300 p-4 text-center">{puntosDeGolpe}</td>
						</tr>
						<tr>
							<td class="border border-gray-300 p-4 text-center">Velocidad</td>
							<td class="border border-gray-300 p-4 text-center">{velocidad}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
		<section id="goto-generaciones">
			<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Generaciones</h3>
			<div class="overflow-x-auto mb-8">
				<table class="w-full text-base border-collapse">
					<thead>
						<tr class="bg-gray-50">
							<th class="border border-gray-300 p-4 text-center font-semibold">Nombre</th>
						</tr>
					</thead>
					<tbody>
						{#each generaciones as gen}
							<tr>
								<td class="border border-gray-300 p-4 text-center">{gen.nombre}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
		<section id="goto-tipos">
			<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Tipos</h3>
			<div class="overflow-x-auto mb-8">
				<table class="w-full text-base border-collapse">
					<thead>
						<tr class="bg-gray-50">
							<th class="border border-gray-300 p-4 text-center font-semibold">Tipo</th>
							<th class="border border-gray-300 p-4 text-center font-semibold">Debilidades</th>
						</tr>
					</thead>
					<tbody>
						{#each tipos as tipo}
							<tr>
								<td class="border border-gray-300 p-4 text-center">{tipo.nombre}</td>
								<td class="border border-gray-300 p-4 text-center">
									{tipo.debilidades.map(d => d.nombre).join(', ')}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
		<section id="goto-habilidades">
			<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Habilidades</h3>
			<div class="overflow-x-auto mb-8">
				<table class="w-full text-base border-collapse">
					<thead>
						<tr class="bg-gray-50">
							<th class="border border-gray-300 p-4 text-center font-semibold">Nombre</th>
						</tr>
					</thead>
					<tbody>
						{#each habilidades as habilidad}
							<tr>
								<td class="border border-gray-300 p-4 text-center">{habilidad.nombre}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
		<section id="goto-evoluciones">
			<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Evoluciones</h3>
			<div class="overflow-x-auto mb-8">
				<table class="w-full text-base border-collapse">
					<thead>
						<tr class="bg-gray-50">
							<th class="border border-gray-300 p-4 text-center font-semibold">Nombre</th>
							<th class="border border-gray-300 p-4 text-center font-semibold">Imagen</th>
						</tr>
					</thead>
					<tbody>
						{#each evoluciones as evo}
							<tr class="hover:bg-gray-50 transition-colors">
								<td class="border border-gray-300 p-4 text-center">{evo.nombre}</td>
								<td class="border border-gray-300 p-4 text-center">
									<a href={`/pokemones/${evo.id}`} rel="external" class="block">
										<img 
											src={evo.imagen} 
											alt={`Imagen de ${evo.nombre}`} 
											class="mx-auto h-auto max-w-[100px] transition-transform duration-200 hover:scale-110"
										/>
									</a>
								</td>
							</tr>
						{:else}
							<tr>
								<td colspan="2" class="border border-gray-300 p-8 text-center text-gray-500">
									Este Pokémon no tiene evoluciones.
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</section>
		<section id="goto-movimientos">
			<h3 class="text-2xl font-semibold text-gray-800 mt-8 mb-4">Movimientos</h3>
			{#snippet fila(movimiento, index)}
				<tr class={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
					<td class="border border-gray-300 p-4 text-center">
						<a href={`/movimientos/${movimiento.id}`} class="text-blue-600 hover:underline">
							{movimiento.nombre}
						</a>
					</td>
					<td class="border border-gray-300 p-4 text-center">{movimiento.generacion.nombre}</td>
					<td class="border border-gray-300 p-4 text-center">{movimiento.tipo.nombre}</td>
					<td class="border border-gray-300 p-4 text-center">{movimiento.categoria}</td>
					<td class="border border-gray-300 p-4 text-center">{movimiento.potencia || '—'}</td>
					<td class="border border-gray-300 p-4 text-center">{movimiento.precision || '—'}</td>
					<td class="border border-gray-300 p-4 text-center">{movimiento.puntos_de_poder}</td>
				</tr>
			{/snippet}
			<article id="goto-movimientos-huevo">
				<h4 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Movimientos por Huevo</h4>
				<Tabla
					encabezados={['Nombre', 'Generación', 'Tipo', 'Categoría', 'Potencia', 'Precisión', 'PP']}
					snippetFila={fila}
					datos={movimientosHuevo}
				/>
			</article>
			<article id="goto-movimientos-maquina">
				<h4 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Movimientos por Máquina</h4>
				<Tabla
					encabezados={['Nombre', 'Generación', 'Tipo', 'Categoría', 'Potencia', 'Precisión', 'PP']}
					snippetFila={fila}
					datos={movimientosMaquina}
				/>
			</article>
			<article id="goto-movimientos-nivel">
				<h4 class="text-xl font-semibold text-gray-800 mt-8 mb-4">Movimientos por Nivel</h4>
				<Tabla
					encabezados={['Nombre', 'Generación', 'Tipo', 'Categoría', 'Potencia', 'Precisión', 'PP']}
					snippetFila={fila}
					datos={movimientosNivel}
				/>
			</article>
		</section>
	</div>
</div>