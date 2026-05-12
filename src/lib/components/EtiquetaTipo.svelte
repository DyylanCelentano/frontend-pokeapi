<script lang="ts">
	interface Props {
		tipo: any;
		tamaño?: string;
	}

	let { tipo, tamaño = 'md' }: Props = $props();

	// Refined type colors - less saturated, more elegant
	const coloresTipos: Record<string, { bg: string; text: string }> = {
		fuego: { bg: 'rgba(249, 115, 22, 0.15)', text: '#f97316' },
		agua: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6' },
		planta: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e' },
		'eléctrico': { bg: 'rgba(234, 179, 8, 0.15)', text: '#eab308' },
		electrico: { bg: 'rgba(234, 179, 8, 0.15)', text: '#eab308' },
		'psíquico': { bg: 'rgba(236, 72, 153, 0.15)', text: '#ec4899' },
		psiquico: { bg: 'rgba(236, 72, 153, 0.15)', text: '#ec4899' },
		hielo: { bg: 'rgba(34, 211, 238, 0.15)', text: '#22d3ee' },
		'dragón': { bg: 'rgba(99, 102, 241, 0.15)', text: '#6366f1' },
		dragon: { bg: 'rgba(99, 102, 241, 0.15)', text: '#6366f1' },
		siniestro: { bg: 'rgba(87, 83, 78, 0.25)', text: '#a8a29e' },
		hada: { bg: 'rgba(244, 114, 182, 0.15)', text: '#f472b6' },
		normal: { bg: 'rgba(156, 163, 175, 0.15)', text: '#9ca3af' },
		lucha: { bg: 'rgba(220, 38, 38, 0.15)', text: '#dc2626' },
		veneno: { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7' },
		tierra: { bg: 'rgba(217, 119, 6, 0.15)', text: '#d97706' },
		volador: { bg: 'rgba(139, 92, 246, 0.15)', text: '#8b5cf6' },
		bicho: { bg: 'rgba(132, 204, 22, 0.15)', text: '#84cc16' },
		insecto: { bg: 'rgba(132, 204, 22, 0.15)', text: '#84cc16' },
		roca: { bg: 'rgba(168, 162, 158, 0.15)', text: '#a8a29e' },
		fantasma: { bg: 'rgba(124, 58, 237, 0.15)', text: '#7c3aed' },
		acero: { bg: 'rgba(148, 163, 184, 0.15)', text: '#94a3b8' }
	};

	let colors = $derived(coloresTipos[tipo?.toLowerCase()] || coloresTipos['normal']);

	const clasesTamaño: Record<string, string> = {
		sm: 'px-2.5 py-1 text-xs',
		md: 'px-3 py-1.5 text-sm',
		lg: 'px-4 py-2 text-base'
	};
</script>

<span
	class="inline-flex items-center justify-center rounded-md font-medium capitalize tracking-wide border {clasesTamaño[tamaño]}"
	style="background-color: {colors.bg}; color: {colors.text}; border-color: {colors.text}30;"
>
	{tipo}
</span>
