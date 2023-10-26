<script lang="ts">
	import { equals } from 'ramda';
	import moment from 'moment-timezone';
	import countries from '@@asset/countries.json';

	export let country: any;
	export let table_data: any;
	export let exchanges: any;
	export let id = '';
	export let tableHeader: any;
	export let unit: string;
	export let karet: string;

	function getRateAtTime(time: string) {
		const momentTime = generateMomentBaseTime(time);
		const rate = table_data.find((e: any) => moment(e.createdAt).isBefore(momentTime));

		if (!rate) return '--';

		// NOTE: temporary measure to counter backend fault
		if (typeof rate.rate === 'string') return rate.rate;

		return rate.rate.toFixed(2);
	}

	const iconMarginTop = 8;

	function generateMomentBaseTime(time: string) {
		const momentTime = moment(time);
		const momentNow = moment();

		return momentTime
			.set('year', momentNow.get('year'))
			.set('month', momentNow.get('month'))
			.set('date', momentNow.get('date'));
	}

	const times = {
		_10am: '2023-04-01T10:00:00',
		_2pm: '2023-04-01T14:00:00',
		_6pm: '2023-04-01T18:00:00',
		_8pm: '2023-04-01T20:00:00'
	};

	function getCountryExchangeRate(country_id: string, exchanges: any) {
		const country = countries.find((c) => c.id === country_id);
		if (!country) return 0;

		const rates = exchanges.filter((e: any) => e.target_currency_code === country?.currency.code);
		const sortedRates = rates.sort((a: any, b: any) => {
			const momentA = moment(a.createdAt);
			const momentB = moment(b.createdAt);

			return momentA.isBefore(momentB) ? 1 : -1;
		});

		if (sortedRates.length === 0) return 0;

		return sortedRates[0].conversion_rate;
	}

	function getConvertedRateAtTime(time: any, country_id: any, exchanges: any) {
		const rate = getRateAtTime(time) * getCountryExchangeRate(country_id, exchanges);

		return rate ? rate.toFixed(2) : '--';
	}
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
					<tr>
						<td>10:00 am</td>
						<td>{karet} Karat/{unit}</td>
						<td>{getRateAtTime(times._10am)}</td>
						<td>{getConvertedRateAtTime(times._10am, 'pakistan', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._10am, 'india', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._10am, 'bangladesh', exchanges)}</td>
					</tr>
					<tr>
						<td>02:00 pm</td>
						<td>{karet} Karat/{unit}</td>
						<td>{getRateAtTime(times._2pm)}</td>
						<td>{getConvertedRateAtTime(times._2pm, 'pakistan', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._2pm, 'india', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._2pm, 'bangladesh', exchanges)}</td>
					</tr>
					<tr>
						<td>06:00 pm</td>
						<td>{karet} Karat/{unit}</td>
						<td>{getRateAtTime(times._6pm)}</td>
						<td>{getConvertedRateAtTime(times._6pm, 'pakistan', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._6pm, 'india', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._6pm, 'bangladesh', exchanges)}</td>
					</tr>
					<tr>
						<td>08:00 pm</td>
						<td>{karet} Karat/{unit}</td>
						<td>{getRateAtTime(times._8pm)}</td>
						<td>{getConvertedRateAtTime(times._8pm, 'pakistan', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._8pm, 'india', exchanges)}</td>
						<td>{getConvertedRateAtTime(times._8pm, 'bangladesh', exchanges)}</td>
					</tr>
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
