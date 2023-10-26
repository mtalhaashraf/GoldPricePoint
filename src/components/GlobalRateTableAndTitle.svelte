<script lang="ts">
	import BorderRoundedTitle from './BorderRoundedTitle.svelte';
	import GlobalRateTable from './GlobalRateTable.svelte';

	export let table_data: any;
	export let exchanges: any;
	export let id = '';
	export let tableHeader: any;
	export let weights: string[];
</script>

<section {id} class="py-2 py-lg-5">
	<div class="width-of-navbar">
		<BorderRoundedTitle>
			<slot name="title" />
		</BorderRoundedTitle>

		<GlobalRateTable {weights} {table_data} {tableHeader} {exchanges} />
	</div>
</section>
