<script>
	let { mensaje = "Cargando..." } = $props();
</script>

<div class="flex flex-col items-center justify-center p-8 text-center">
	<!-- Pokeball animada simple -->
	<div class="pokeball animate-spin mb-4"></div>
	
	<!-- Mensaje de carga -->
	<p class="text-lg font-medium text-slate-600 animate-pulse">
		{mensaje}
	</p>
	
	<!-- Puntos animados -->
	<div class="flex space-x-1 mt-2">
		<div class="dot"></div>
		<div class="dot" style="animation-delay: 0.1s;"></div>
		<div class="dot" style="animation-delay: 0.2s;"></div>
	</div>
</div>

<style>
	.pokeball {
		width: 60px;
		height: 60px;
		background: 
			linear-gradient(to bottom, 
				#ff6b6b 0%, 
				#ff6b6b 45%, 
				#333 45%, 
				#333 55%, 
				#f8f9fa 55%, 
				#f8f9fa 100%
			);
		border-radius: 50%;
		border: 3px solid #333;
		position: relative;
	}
	
	.pokeball::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 20px;
		height: 20px;
		background: radial-gradient(circle, #f8f9fa, #dee2e6);
		border: 3px solid #333;
		border-radius: 50%;
		transform: translate(-50%, -50%);
	}
	
	.dot {
		width: 8px;
		height: 8px;
		background-color: #3b82f6;
		border-radius: 50%;
		animation: bounce 1.4s ease-in-out infinite both;
	}
	
	@keyframes bounce {
		0%, 80%, 100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1.4);
		}
	}
</style>
