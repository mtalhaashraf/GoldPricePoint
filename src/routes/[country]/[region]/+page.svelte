<script lang="ts">
	import LayoutB from '$lib/exchangeLayouts/LayoutB.svelte';
	import countries from '@@asset/countries.json';
	import { neitherEmptyNorNil } from '@@helpers';
	import { page } from '$app/stores';
	import { complement, either, equals, isEmpty, isNil, pipe, prop, toUpper } from 'ramda';
	import { onMount } from 'svelte';
	import Error from '../Error.svelte';
	import Spinner from '@@component/Spinner.svelte';

	let country: App.Country | undefined;
	let region: App.Region | undefined;

	let loading: boolean = true;

	const asyncLoader = async (fn: Function) => {
		loading = true;
		await fn();
		loading = false;
	};

	const hasRegions = pipe(prop('regions'), neitherEmptyNorNil);

	let data = {
		country: {
			layout: 'A'
		},
		countryRatesData: {},
		goldTableHeader: {},
		silverTableHeader: {}
	};

	onMount(() =>
		asyncLoader(() => {
			country = countries.find((e) => equals(e.id)($page.params.country));
			if (neitherEmptyNorNil(country) && hasRegions(country)) {
				region = country?.regions?.find(pipe(prop('id'), equals($page.params.region)));
			}
		})
	);
</script>

<!-- Svelte Header -->
<svelte:head>
	<title>{region?.name || toUpper($page.params.region)}</title>
</svelte:head>

{#if loading}
	<Spinner />
{:else}
	{#key data}
		{#if neitherEmptyNorNil(country) && neitherEmptyNorNil(region)}
			{#if country?.layout === 'B'}
				<LayoutB
					{country}
					{region}
					countryRatesData={data.countryRatesData}
					goldTableHeader={data.goldTableHeader}
					silverTableHeader={data.silverTableHeader}
				/>
			{:else}
				<Error type="not-found">This region is not found.</Error>
			{/if}
		{:else}
			<Error type="not-found">This region is not found.</Error>
		{/if}
	{/key}
{/if}
