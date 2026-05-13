<script lang="ts">
	interface Props {
		tipo: any;
		tamaño?: string; // sm, md, lg
	}

	let { tipo, tamaño = 'md' }: Props = $props();

	const coloresTipos = {
		fuego: 'var(--tipo-fuego)',
		agua: 'var(--tipo-agua)',
		planta: 'var(--tipo-planta)',
		electrico: 'var(--tipo-electrico)',
		eléctrico: 'var(--tipo-electrico)',
		psiquico: 'var(--tipo-psiquico)',
		psíquico: 'var(--tipo-psiquico)',
		hielo: 'var(--tipo-hielo)',
		dragon: 'var(--tipo-dragon)',
		dragón: 'var(--tipo-dragon)',
		siniestro: 'var(--tipo-siniestro)',
		hada: 'var(--tipo-hada)',
		normal: 'var(--tipo-normal)',
		lucha: 'var(--tipo-lucha)',
		veneno: 'var(--tipo-veneno)',
		tierra: 'var(--tipo-tierra)',
		volador: 'var(--tipo-volador)',
		bicho: 'var(--tipo-bicho)',
		roca: 'var(--tipo-roca)',
		fantasma: 'var(--tipo-fantasma)',
		acero: 'var(--tipo-acero)'
	};

	let colorFondo = $derived(coloresTipos[tipo.toLowerCase()] || 'var(--tipo-normal)');
	let colorTexto = $derived(
		['eléctrico', 'tierra', 'hada'].includes(tipo.toLowerCase()) ? '#000' : '#fff'
	);

	const clasesTamaño = {
		sm: 'type-chip sm',
		md: 'type-chip md',
		lg: 'type-chip lg'
	};
</script>

<span
	class="type-chip {clasesTamaño[tamaño]}"
	style="background-color: {colorFondo}; color: {colorTexto};"
>
	{tipo}
</span>
