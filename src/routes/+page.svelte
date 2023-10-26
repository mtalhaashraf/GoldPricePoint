<script lang="ts">
	import LayoutA from '$lib/exchangeLayouts/LayoutA.svelte';

	export let data;
</script>

{#key data}
	<LayoutA
		country={data.country}
		countryRatesData={data.countryRatesData}
		goldTableHeader={data.goldTableHeader}
		silverTableHeader={data.silverTableHeader}
	/>
{/key}
