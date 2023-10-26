<script lang="ts">
	import LayoutA from '$lib/exchangeLayouts/LayoutA.svelte';
	import LayoutB from '$lib/exchangeLayouts/LayoutB.svelte';
	import LayoutC from '$lib/exchangeLayouts/LayoutC.svelte';
	import { page } from '$app/stores';
	import countries from '@@asset/countries.json';
	import { equals, isNil, toUpper, both } from 'ramda';
	import { onMount } from 'svelte';
	import Error from './Error.svelte';
	import { neitherEmptyNorNil } from '../../helpers';

	let country: App.Country | undefined;

	let data = {
		country: {
			layout: 'A'
		},
		countryRatesData: {},
		goldTableHeader: {},
		silverTableHeader: {}
	};

	onMount(() => {
		country = countries.find((e) => equals(e.id)($page.params.country));

	});
</script>

<!-- Svelte Header -->
<svelte:head>
	<title>{country?.name || toUpper($page.params.country)}</title>
</svelte:head>

{#key data}
	{#if neitherEmptyNorNil(country)}
		{#if country?.layout === 'A'}
			<LayoutA
				{country}
				countryRatesData={data.countryRatesData}
				goldTableHeader={data.goldTableHeader}
				silverTableHeader={data.silverTableHeader}
			/>
		{:else if country?.layout === 'B'}
			<LayoutB
				{country}
				countryRatesData={data.countryRatesData}
				goldTableHeader={data.goldTableHeader}
				silverTableHeader={data.silverTableHeader}
			/>
		{:else if country?.layout === 'C'}
			<LayoutC
				{country}
				countryRatesData={data.countryRatesData}
				goldTableHeader={data.goldTableHeader}
				silverTableHeader={data.silverTableHeader}
			/>
		{:else}
			<Error type="not-found">This country is not found.</Error>
		{/if}
	{:else}
		<Error type="not-found">This country is not found.</Error>
	{/if}
{/key}
