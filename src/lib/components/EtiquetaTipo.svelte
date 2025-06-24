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
		eléctrico: 'var(--tipo-electrico)',
		psíquico: 'var(--tipo-psiquico)',
		hielo: 'var(--tipo-hielo)',
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
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm',
		lg: 'px-4 py-1.5 text-base'
	};
</script>

<span
	class="inline-flex items-center justify-center rounded-lg font-semibold capitalize tracking-wide {clasesTamaño[
		tamaño
	]}"
	style="background-color: {colorFondo}; color: {colorTexto};"
>
	{tipo}
</span>
