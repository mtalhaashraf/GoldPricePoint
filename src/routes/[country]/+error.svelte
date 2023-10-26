<script>
	import { page } from '$app/stores';
	import Error from './Error.svelte';
</script>

<Error type="server-error">
	<h1>{$page.error?.message || 'An Error Has Occurred'}</h1>
</Error>
