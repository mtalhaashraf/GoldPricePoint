<script lang="ts">
	import BorderRoundedTitle from '@@component/BorderRoundedTitle.svelte';
	import WebsiteHeader from '@@component/WebsiteHeader.svelte';
	import {
		calculateLatestGoldRate,
		getCountryExchangeRate,
		getCountryFromId,
		getGramFromTola,
		getKilogramFromTola,
		getOunceFromTola
	} from './helpers';
	import moment from 'moment-timezone';
	import GoldRateCardWithCountry from '@@component/GoldRateCardWithCountry.svelte';
	import GoldRateCalculator from '@@component/GoldRateCalculator.svelte';
	import TimeRateTableAndTitle from '@@component/TimeRateTableAndTitle.svelte';
	import CityGoldRateCard from '@@component/CityGoldRateCard.svelte';
	import SilverRateTableAndTitle from '@@component/SilverRateTableAndTitle.svelte';

	export let country: any;
	export let goldTableHeader: any;
	export let silverTableHeader: any;
	export let countryRatesData: any;
	export let region: any = null;

	console.log(countryRatesData);

	const primaryCountryLatestGoldRate24KaretGold = calculateLatestGoldRate(
		countryRatesData.gold_rates_24_karat
	).rate?.toFixed(2);
	const primaryCountryLatestGoldRate24KaretGoldGram = getGramFromTola(
		primaryCountryLatestGoldRate24KaretGold || 0
	).toFixed(2);

	const countryRatesDataInGram = {
		...countryRatesData,
		gold_rates_24_karat: countryRatesData.gold_rates_24_karat.map((rate: any) => {
			return {
				...rate,
				rate: getGramFromTola(rate.rate)
			};
		}),
		gold_rates_22_karat: countryRatesData.gold_rates_22_karat.map((rate: any) => {
			return {
				...rate,
				rate: getGramFromTola(rate.rate)
			};
		}),
		gold_rates_21_karat: countryRatesData.gold_rates_21_karat.map((rate: any) => {
			return {
				...rate,
				rate: getGramFromTola(rate.rate)
			};
		}),
		gold_rates_18_karat: countryRatesData.gold_rates_18_karat.map((rate: any) => {
			return {
				...rate,
				rate: getGramFromTola(rate.rate)
			};
		})
	};

	const countryRatesDataInKilogram = {
		...countryRatesData,
		gold_rates_24_karat: countryRatesData.gold_rates_24_karat.map((rate: any) => {
			return {
				...rate,
				rate: getKilogramFromTola(rate.rate)
			};
		})
	};

	const countryRatesDataInOunce = {
		...countryRatesData,
		gold_rates_24_karat: countryRatesData.gold_rates_24_karat.map((rate: any) => {
			return {
				...rate,
				rate: getOunceFromTola(rate.rate)
			};
		})
	};

	const citiesInPakistan: { image: CityIcon; title: string; path: string }[] = [
		{
			image: 'karachi',
			title: 'Gold Rate in Karachi',
			path: 'pakistan/karachi'
		},
		{
			image: 'multan',
			title: 'Gold Rate in Multan',
			path: 'pakistan/multan'
		},
		{
			image: 'islamabad',
			title: 'Gold Rate in Islamabad',
			path: 'pakistan/islamabad'
		},
		{
			image: 'quetta',
			title: 'Gold Rate in Quetta',
			path: 'pakistan/quetta'
		},
		{
			image: 'lahore',
			title: 'Gold Rate in Lahore',
			path: 'pakistan/lahore'
		},
		{
			image: 'faisalabad',
			title: 'Gold Rate in Faisalabad',
			path: 'pakistan/faisalabad'
		},
		{
			image: 'pehsawar',
			title: 'Gold Rate in Pehsawar',
			path: 'pakistan/pehsawar'
		},
		{
			image: 'ary',
			title: 'ARY Gold Rate',
			path: 'pakistan/ary'
		}
	];
</script>

<main>
	<WebsiteHeader />
	<section class="py-5 px-2 px-sm-0">
		<div class="section-container width-of-navbar">
			<BorderRoundedTitle className="my-4">
				{!region ? country.name : region.name}
				Gold Rate in Pakistan and Indian Currency</BorderRoundedTitle
			>
			<div class="m-2 note m-md-3 m-lg-4 m-lg-5">
				<p class="text-center responsive font-dm-sans">
					<strong>LAST</strong> Updated on {moment(
						calculateLatestGoldRate(countryRatesData.gold_rates_24_karat).createdAt
					)
						.tz(country.timezone)
						.format('dddd, D MMMM YYYY, hh:mm zz')}
				</p>
			</div>

			<div class="cards-container">
				<div class="m-0 cards-flex row row-cols-lg-3 row-cols-sm-2 g-3 justify-content-center w-100 row-cols-1">
					<div class="col">
						<GoldRateCardWithCountry
							unit="Gram"
							countryId={country.id}
							rate={primaryCountryLatestGoldRate24KaretGoldGram || '--'}
						/>
					</div>
					<div class="col">
						<GoldRateCardWithCountry countryId="pakistan" rate={primaryCountryLatestGoldRate24KaretGold || '--'} />
					</div>
					<div class="col">
						<GoldRateCardWithCountry
							countryId="united_arab_emirates"
							rate={primaryCountryLatestGoldRate24KaretGold ||
								0 * getCountryExchangeRate('united_arab_emirates', countryRatesData)}
						/>
					</div>
				</div>
			</div>

			<div class="my-5">
				<p class="text-center responsive font-dm-sans">
					We provide you timely and accurate gold rates of Dubai and Converted these gold rates into Pakistani, Indian,
					and Bangladeshi currency. These rates are updated using VAT also. As international gold rates are fluctuating
					with every passing minute, so we try to update Dubai gold rates as major changes in gold rates occur. 24 karat
					gold is the purest form of gold and used for investment purpose because of its softness.
				</p>
			</div>
		</div>
	</section>

	<TimeRateTableAndTitle
		weights={[24, 22, 21, 18].map((n) => `${n} Karet/Tola`)}
		unit="Tola"
		karet="24"
		table_data={[
			countryRatesData.gold_rates_24_karat,
			countryRatesData.gold_rates_22_karat,
			countryRatesData.gold_rates_21_karat,
			countryRatesData.gold_rates_18_karat
		]}
		countryId={country.id}
		tableHeader={goldTableHeader}
		exchanges={countryRatesData.exchanges}
	>
		<svelte:fragment slot="title">
			Gold Rate in {!region ? country.name : region.name}
			<span class="text-danger">Per Tola</span>
		</svelte:fragment>
	</TimeRateTableAndTitle>

	<TimeRateTableAndTitle
		weights={[24, 22, 21, 18].map((n) => `${n} Karet/Gram`)}
		unit="Gram"
		karet="24"
		table_data={[
			countryRatesDataInGram.gold_rates_24_karat,
			countryRatesDataInGram.gold_rates_22_karat,
			countryRatesDataInGram.gold_rates_21_karat,
			countryRatesDataInGram.gold_rates_18_karat
		]}
		countryId={country.id}
		tableHeader={goldTableHeader}
		exchanges={countryRatesData.exchanges}
	>
		<svelte:fragment slot="title">
			Gold Rate in {!region ? country.name : region.name}
			<span class="text-danger">Per Gram</span>
		</svelte:fragment>
	</TimeRateTableAndTitle>

	<TimeRateTableAndTitle
		weights={['Ounce', 'Kilogram']}
		unit=""
		karet=""
		table_data={[countryRatesDataInKilogram.gold_rates_24_karat, countryRatesDataInOunce.gold_rates_24_karat]}
		countryId={country.id}
		tableHeader={goldTableHeader}
		exchanges={countryRatesData.exchanges}
	>
		<svelte:fragment slot="title">
			Gold Rate in {!region ? country.name : region.name}
			<span class="text-danger">Per Ounce and Per Kilogram</span>
		</svelte:fragment>
	</TimeRateTableAndTitle>

	{#if country.id === 'pakistan' && !region}
		<div class="width-of-navbar">
			<BorderRoundedTitle>Gold Rate in Different Cities of Pakistan</BorderRoundedTitle>
			<div class="cities-grid">
				{#each citiesInPakistan as city}
					<CityGoldRateCard {...city} />
				{/each}
			</div>
		</div>
		<br />
	{/if}

	<!-- Calculator -->
	<GoldRateCalculator exchanges={countryRatesData.exchanges} primaryCountry={countryRatesData} {country} />

	<br />

	<SilverRateTableAndTitle
		{country}
		exchanges={countryRatesData.exchanges}
		table_data={countryRatesData.silver_rates}
		tableHeader={silverTableHeader}
	>
		<svelte:fragment slot="title">
			Silver Rate in {!region ? country.name : region.name}
		</svelte:fragment>
	</SilverRateTableAndTitle>

	<!-- <RateTableAndTitle table_data={data.gold_per_ounce}> -->
	<!-- 	<svelte:fragment slot="title"> -->
	<!-- 		Silver Rate in {data.country} Converted into Pakistan, Indian, and Bangladeshi Currency -->
	<!-- 	</svelte:fragment> -->
	<!-- </RateTableAndTitle> -->

	<br />

	<!-- Disclimer Section -->
	<section id="disclaimer">
		<h1>Disclaimer</h1>
		<p>
			This Paragrap will be about Disclaimer. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ad
			reiciendis suscipit quae placeat quas. Velit inventore atque possimus voluptatem, dignissimos, exercitationem eius
			mollitia esse ratione repellat dolorum reiciendis amet et ipsam corrupti quos sint minus eaque, adipisci
			doloremque! Harum distinctio minus hic eveniet exercitationem dicta at labore eius unde molestias, voluptates
			voluptate totam provident corrupti nesciunt veritatis alias modi omnis accusantium. Molestias, quaerat facere
			natus architecto laudantium fugit magni!
		</p>
	</section>
</main>

<style lang="scss">
	@use '../../scss/pages/(Website)/HomePage.scss' as *;

	.cities-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-columns: repeat(auto-fill, auto);
		gap: 2rem;
		padding: 1rem;

		@media (max-width: 768px) {
			grid-template-columns: auto;
			width: fit-content;
			margin: 0 auto;
		}
	}
</style>
