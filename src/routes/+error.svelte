<script>
	import { page } from '$app/stores';
	import ErrorPage from '$lib/components/ErrorPage.svelte';

	$: error = $page.error;
	$: status = $page.status;

	// Valores por defecto si no hay información específica del error
	$: errorData = {
		title: error?.title || "¡Ups! Algo salió mal",
		message: error?.message || "No pudimos procesar tu solicitud",
		statusCode: status || 500,
		icon: error?.icon || "❌",
		suggestions: error?.suggestions || [],
		backUrl: "/",
		backText: "Volver al inicio"
	};
</script>

<svelte:head>
	<title>Error {errorData.statusCode} - PokéAPI</title>
</svelte:head>

<ErrorPage 
	title={errorData.title}
	message={errorData.message}
	statusCode={errorData.statusCode}
	icon={errorData.icon}
	suggestions={errorData.suggestions}
	backUrl={errorData.backUrl}
	backText={errorData.backText}
/>
