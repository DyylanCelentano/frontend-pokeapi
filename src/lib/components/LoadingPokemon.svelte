<script>
	let { mensaje = "Cargando..." } = $props();
</script>

<div class="loading-shell">
	<div class="loading-bars" aria-hidden="true">
		<span></span>
		<span></span>
		<span></span>
	</div>
	<p class="loading-message">{mensaje}</p>
</div>

<style>
	.loading-shell {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		padding: 1.5rem 2rem;
		text-align: center;
	}

	.loading-bars {
		display: flex;
		align-items: flex-end;
		gap: 0.35rem;
		height: 36px;
	}

	.loading-bars span {
		width: 6px;
		height: 14px;
		border-radius: 999px;
		background: linear-gradient(180deg, var(--accent), var(--accent-cool));
		animation: barPulse 1.1s ease-in-out infinite;
	}

	.loading-bars span:nth-child(2) {
		animation-delay: 0.15s;
		height: 22px;
	}

	.loading-bars span:nth-child(3) {
		animation-delay: 0.3s;
		height: 28px;
	}

	.loading-message {
		font-size: 1rem;
		font-weight: 600;
		color: var(--ink-muted);
	}

	@keyframes barPulse {
		0%, 100% {
			transform: scaleY(0.65);
			opacity: 0.6;
		}
		50% {
			transform: scaleY(1);
			opacity: 1;
		}
	}
</style>
