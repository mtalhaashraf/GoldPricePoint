<script lang="ts">
	// import { browser } from '$app/environment';
	import { equals } from 'ramda';
	import moment from 'moment-timezone';

	export let table_data: any;
	export let exchanges: any;
	export let id = '';
	export let tableHeader: any;
	export let unit: string;
	export let karet: string;
	export let weights: string[];

	function getRateAtTime(time: string, table: any) {
		const momentTime = generateMomentBaseTime(time);
		const rate = table.find((e: any) => moment(e.createdAt).isBefore(momentTime));

		if (!rate) return '--';

		// NOTE: temporary measure to counter backend fault
		if (typeof rate.rate === 'string') return rate.rate;

		return rate.rate.toFixed(2);
	}

	function generateMomentBaseTime(time: string) {
		const momentTime = moment(time);
		const momentNow = moment();

		return momentTime
			.set('year', momentNow.get('year'))
			.set('month', momentNow.get('month'))
			.set('date', momentNow.get('date'));
	}

	const iconMarginTop = 8;

	const times = {
		_10am: '2023-04-01T10:00:00',
		_2pm: '2023-04-01T14:00:00',
		_6pm: '2023-04-01T18:00:00',
		_8pm: '2023-04-01T20:00:00'
	};
</script>

<article class="rate-table-article" {id}>
	<div class="rate-table-container">
		<div class="rate-table__wrapper">
			<table class="rate-table__table">
				<thead>
					<tr>
						{#if table_data}
							{#each tableHeader as item}
								<th class="custom-header">
									{@html item.html}
									<br />
									{#if equals(item.icon)('gold')}
										<img src="/icons/gold.png" style={`margin-top: ${iconMarginTop}px;`} alt="" />
									{:else if equals(item.icon)('silver')}
										<img src="/icons/gold.png" style={`margin-top: ${iconMarginTop}px;`} alt="" />
									{:else if equals(item.icon)('time')}
										<img src="/icons/time.png" style={`margin-top: ${iconMarginTop}px;`} alt="" />
									{:else if equals(item.icon)('scale')}
										<img src="/icons/scale.png" style={`margin-top: ${iconMarginTop}px;`} alt="" />
									{:else}
										<img
											src={`https://flagsapi.com/${item.icon}/flat/32.png`}
											style={`margin-top: ${iconMarginTop}px;`}
											alt=""
										/>
									{/if}
								</th>
							{/each}
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each weights as weight, i}
						<tr>
							<td>
								{weight}
							</td>
							<td>
								{getRateAtTime(times._10am, table_data[i])}
							</td>
							<td>
								{getRateAtTime(times._2pm, table_data[i])}
							</td>
							<td>
								{getRateAtTime(times._6pm, table_data[i])}
							</td>
							<td>
								{getRateAtTime(times._8pm, table_data[i])}
							</td>
							<td>
								{getRateAtTime(times._10am, table_data[i])}
							</td>
						</tr>
					{/each}

					<!-- {#if table_data} -->
					<!-- 	{#each table_data.body as table_row_data, row_index} -->
					<!-- 		<tr class="row-{row_index} table_row"> -->
					<!-- 			{#each table_row_data as data} -->
					<!-- 				<td class="table_data column">{@html data}</td> -->
					<!-- 			{/each} -->
					<!-- 		</tr> -->
					<!-- 	{/each} -->
					<!-- {/if} -->
				</tbody>
			</table>
		</div>
	</div>

	<br />

	<div class="px-2 text-center seo-description font-dm-sans px-sm-0 text-lg-start">
		<p class="responsive">
			Gold is used in ornaments because of its shine and historic importance. But 100% pure gold cannot be used in
			ornaments. Other metals like copper, zinc or silver are added to gold to make it suitable for jewelry use. 22
			karat gold is 91.66% pure gold and 8.34% impurity is added in it.
		</p>
	</div>
</article>

<style lang="scss">
	@use '../scss/components/rateTable' as *;
</style>
