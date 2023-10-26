<script lang="ts">
	import { equals } from 'ramda';
	import { calculateLatestGoldRate, getCountryExchangeRate } from '$lib/exchangeLayouts/helpers';

	export let table_data: any;
	export let exchanges: any;
	export let id = '';
	export let tableHeader: any;
	export let weights: string[];

	const iconMarginTop = 8;
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
							<td>{weight}</td>
							<td>{calculateLatestGoldRate(table_data[i]).rate?.toFixed(2)}</td>
							<td>
								{(
									(calculateLatestGoldRate(table_data[i]).rate || 0) * getCountryExchangeRate('pakistan', { exchanges })
								).toFixed(2)}
							</td>
							<td>
								{(
									(calculateLatestGoldRate(table_data[i]).rate || 0) * getCountryExchangeRate('india', { exchanges })
								).toFixed(2)}
							</td>
							<td>
								{(
									(calculateLatestGoldRate(table_data[i]).rate || 0) *
									getCountryExchangeRate('bangladesh', { exchanges })
								).toFixed(2)}
							</td>
						</tr>
					{/each}
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
