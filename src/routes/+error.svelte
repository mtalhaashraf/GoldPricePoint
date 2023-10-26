<script>
	import { page } from '$app/stores';
</script>

<main>
	<h1>{$page.error?.message || 'An Error Has Occurred'}</h1>
</main>

<style>
	main {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
