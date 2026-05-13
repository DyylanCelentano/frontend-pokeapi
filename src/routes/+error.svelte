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
		suggestions: error?.suggestions || [],
		backUrl: "/",
		backText: "Volver al inicio"
	};
</script>

<svelte:head>
	<title>IntroDex | Error {errorData.statusCode}</title>
</svelte:head>

<ErrorPage 
	title={errorData.title}
	message={errorData.message}
	statusCode={errorData.statusCode}
	suggestions={errorData.suggestions}
	backUrl={errorData.backUrl}
	backText={errorData.backText}
/>
