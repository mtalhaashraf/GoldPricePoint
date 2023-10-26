<script lang="ts">
	import BorderRoundedTitle from './BorderRoundedTitle.svelte';
	import RateTable from './RateTable.svelte';
	import countries from '@@asset/countries.json';

	export let countryId = '';
	export let table_data: any;
	export let exchanges: any;
	export let id = '';
	export let tableHeader: any;
	export let unit: string;
	export let karet: string;

	const country = countries.find((e) => e.id === countryId);
</script>

<section {id} class="py-2 py-lg-5">
	<div class="width-of-navbar">
		<BorderRoundedTitle>
			<slot name="title" />
		</BorderRoundedTitle>

		<RateTable {country} {table_data} {tableHeader} {exchanges} {karet} {unit} />
	</div>
</section>
