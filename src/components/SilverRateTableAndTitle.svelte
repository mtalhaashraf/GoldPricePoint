<script lang="ts">
	import { calculateLatestGoldRate } from '$lib/exchangeLayouts/helpers';
	import moment from 'moment-timezone';
	import BorderRoundedTitle from './BorderRoundedTitle.svelte';
	import SilverRateTable from './SilverRateTable.svelte';

	export let country: any;
	export let id = '';
	export let table_data: any;
	export let exchanges: any;
	export let tableHeader: any;
</script>

<section {id} class="py-2 py-lg-5">
	<div class="width-of-navbar">
		<BorderRoundedTitle>
			<slot name="title" />
		</BorderRoundedTitle>

		<p class="text-center responsive font-dm-sans mt-4">
			<strong>LAST</strong> Updated on {moment(calculateLatestGoldRate(table_data || [])?.time)
				.tz(country.timezone)
				.format('dddd, D MMMM YYYY, hh:mm zz')}
		</p>

		<SilverRateTable {table_data} {tableHeader} {exchanges} />
	</div>
</section>
