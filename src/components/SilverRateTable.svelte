<script lang="ts">
	// import { browser } from '$app/environment';
	import { equals } from 'ramda';
	import moment from 'moment-timezone';
	import countries from '@@asset/countries.json';

	export let table_data: any;
	export let exchanges: any;
	export let id = '';
	export let tableHeader: any;

	function getCountryExchangeRate(country_id: string, exchanges: any) {
		const country = countries.find((c) => c.id === country_id);
		if (!country) return 0;

		const rates = exchanges.filter((e: any) => e.target_currency_code === country?.currency.code);
		const sortedRates = rates.sort((a: any, b: any) => {
			const momentA = moment(a.createdAt);
			const momentB = moment(b.createdAt);

			return momentA.isBefore(momentB) ? 1 : -1;
		});

		if (sortedRates?.length === 0) return 0;

		return sortedRates[0].conversion_rate;
	}

	const table_data_keys = {
		ten_grams: '10 Grams',
		tola: 'Tola',
		ounce: 'Ounce',
		kilogram: 'Kilogram'
	};

	let table_body: any[] = [];

	if (table_data?.length) {
		table_body = Object.keys(table_data_keys).map((key) => {
			return {
				// @ts-ignore
				unit: table_data_keys[key],
				rate: table_data[0][key]
			};
		});
	}

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
									{#if equals(item.icon)('silver')}
										<img src="/icons/silver.png" style={`margin-top: ${iconMarginTop}px;`} alt="" />
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
					{#each table_body as row}
						<tr>
							<td>{row.unit}</td>
							<td>{row.rate}</td>
							<td>{row.rate * getCountryExchangeRate('pakistan', exchanges)}</td>
							<td>{row.rate * getCountryExchangeRate('india', exchanges)}</td>
							<td>{row.rate * getCountryExchangeRate('bangladesh', exchanges)}</td>
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
