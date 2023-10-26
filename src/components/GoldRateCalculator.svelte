<script lang="ts">
	import { IMG_CALCULATOR_ILLUSTRATION } from '@@asset/img';
	import BsDropdown from './BsDropdown.svelte';
	import countries from '@@asset/countries.json';
	import {
		getCountryExchangeRate,
		getCountryFromId,
		calculateLatestGoldRate,
		getGramFromTola,
		getKilogramFromTola,
		getOunceFromTola
	} from '$lib/exchangeLayouts/helpers';

	export let country: any;
	export let primaryCountry: any;
	export let exchanges: any;

	let selectedKarat: any;
	let selectedWeight: any;
	let selectedCurrency: any;

	let result = '';

	$: if (selectedKarat && selectedWeight && selectedCurrency) {
		const karatRates = primaryCountry[`gold_rates_${selectedKarat.value}_karat`];
		const latestKaratRate = calculateLatestGoldRate(karatRates).rate || 0;

		let unitConvertedWeight: number;
		switch (selectedWeight.value) {
			case 'tola':
				unitConvertedWeight = selectedWeight.value;
				break;
			case 'gram':
				unitConvertedWeight = getGramFromTola(selectedWeight.value);
				break;
			case 'kilogram':
				unitConvertedWeight = getKilogramFromTola(selectedWeight.value);
				break;
			case 'ounce':
				unitConvertedWeight = getOunceFromTola(selectedWeight.value);
				break;
		}

		let unitConvertedRate;
		if (selectedCurrency.value === country.id) {
			unitConvertedRate = latestKaratRate;
		} else {
			const exchangeRate = getCountryExchangeRate(selectedCurrency.value, { exchanges });
			unitConvertedRate = latestKaratRate! * exchangeRate;
		}

		const total = unitConvertedWeight! * unitConvertedRate!;
		result = total ? total.toFixed(2) : '--';
	}

	//
	// let innerWidth: number;
	// let isMobile: boolean;
	//
	// $: isMobile = innerWidth < 320;
</script>

<!-- <svelte:window {innerWidth} /> -->

<div class="gold-rate-calculator">
	<div class="calculator-wrapper">
		<div class="container width-of-navbar" style="justify-content: space-between">
			<div class="calculator-buttons">
				<div class="py-4 title">
					<h2 class="text-warning fw-bolder">Gold Calculator</h2>
				</div>
				<div class="">
					<div class="buttons-group">
						<BsDropdown
							btnClassName="btn border-2 border border-warning btn-outline-warning btn-lg py-3 px-5"
							id="calculator-dropdown-1"
							label="Karat"
							bind:selectedItem={selectedKarat}
							items={[
								{
									label: '24 Karat',
									value: 24
								},
								{
									label: '22 Karat',
									value: 22
								},
								{
									label: '21 Karat',
									value: 21
								},
								{
									label: '18 Karat',
									value: 18
								}
							]}
						/>
						<BsDropdown
							btnClassName="btn border-2 border border-warning btn-outline-warning btn-lg py-3 px-5"
							id="calculator-dropdown-2"
							label="Weight"
							bind:selectedItem={selectedWeight}
							items={[
								{
									label: 'Tola',
									value: 'tola'
								},
								{
									label: 'Gram',
									value: 'gram'
								},
								{
									label: 'Kilogram',
									value: 'kilogram'
								},
								{
									label: 'Ounce',
									value: 'ounce'
								}
							]}
						/>
						<BsDropdown
							btnClassName="btn border-2 border border-warning btn-outline-warning btn-lg py-3 px-5"
							id="calculator-dropdown-3"
							label="Currency"
							bind:selectedItem={selectedCurrency}
							items={[
								{
									label: countries.find((i) => i.id === country.id)?.name || '',
									value: country.id
								},
								...exchanges.map((c) => {
									return {
										label: countries.find((i) => i.id === c?.id)?.name || '',
										value: c?.id
									};
								})
							]}
						/>
					</div>
					<div class="d-flex flex-column justify-content-center">
						<div class="result">
							<svg width="40" viewBox="0 0 31 14" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M0 2H31M0 12H31" stroke="#B07818" stroke-width="3" stroke-linejoin="round" />
							</svg>
							<input
								type="text"
								style="margin: 0px; color: #B07818;"
								class="mt-2 mr-0 border-2 border form-control border-warning result-field"
								placeholder="Result"
								disabled
								bind:value={result}
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="calculator-illustration">
				<img src={IMG_CALCULATOR_ILLUSTRATION} alt="" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../scss/components/goldrateCalculator' as *;

	.container {
		display: flex;
		@media screen and (max-width: 768px) {
			align-items: center;
			justify-content: center;
			flex-direction: column-reverse;
		}
	}

	.buttons-group {
		display: flex;
		gap: 5px;
		flex-wrap: wrap;

		@media screen and (max-width: 768px) {
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}

	.result {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 5px;

		input {
			margin-right: 0px;
		}
	}
</style>
