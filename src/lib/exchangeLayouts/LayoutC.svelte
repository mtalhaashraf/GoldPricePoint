<script lang="ts">
	import BorderRoundedTitle from '@@component/BorderRoundedTitle.svelte';
	import GoldRateCalculator from '@@component/GoldRateCalculator.svelte';
	import GoldRateCardWithCountry from '@@component/GoldRateCardWithCountry.svelte';
	import RateTableAndTitle from '@@component/RateTableAndTitle.svelte';
	import WebsiteHeader from '@@component/WebsiteHeader.svelte';
	// import CityGoldRateCard from '@@component/CityGoldRateCard.svelte';
	import TimeRateTableAndTitle from '@@component/TimeRateTableAndTitle.svelte';
	import moment from 'moment-timezone';
	import {
		calculateLatestGoldRate,
		getCountryExchangeRate,
		getCountryFromId,
		getGramFromTola,
		getKilogramFromTola,
		getOunceFromTola
	} from './helpers';
	import SilverRateTableAndTitle from '@@component/SilverRateTableAndTitle.svelte';
	import GlobalRateTableAndTitle from '@@component/GlobalRateTableAndTitle.svelte';

	export let country: any;
	export let goldTableHeader: any;
	export let silverTableHeader: any;
	export let countryRatesData: any;
	// // TODO: add region support
	// export let isRegion = false;

	console.log('layout C', { countryRatesData });

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

	// console.log({ countryRatesData, countryRatesDataInGram, countryRatesDataInKilogram, countryRatesDataInOunce });

	// const now = moment.tz(data.timezone);
	// const timezoneName = `${data.countryCode} Standard Time`;
	// let country: string = data.country
	// 	? `${(data.country as string).charAt(0).toUpperCase() + (data.country as string).substring(1)}`
	// 	: '';

	// NOTE: handle null prices
	const primaryCountryLatestGoldRate24KaretGold = calculateLatestGoldRate(countryRatesData.gold_rates_24_karat).rate;
</script>

<main>
	<WebsiteHeader />
	<section class="py-5 px-2 px-sm-0">
		<div class="section-container width-of-navbar">
			<BorderRoundedTitle className="my-4">{country.name} Gold Rate in Pakistan and Indian Currency</BorderRoundedTitle>
			<div class="m-2 note m-md-3 m-lg-4 m-lg-5">
				<p class="text-center responsive font-dm-sans">
					<strong>LAST</strong> Updated on {moment(calculateLatestGoldRate(countryRatesData.gold_rates_24_karat).time)
						.tz(country.timezone)
						.format('dddd, D MMMM YYYY, hh:mm zz')}
				</p>
			</div>

			<div class="cards-container">
				<div class="m-0 cards-flex row row-cols-lg-3 row-cols-sm-2 g-3 justify-content-center w-100 row-cols-1">
					<div class="col">
						<GoldRateCardWithCountry countryId={country.id} rate={primaryCountryLatestGoldRate24KaretGold || 0} />
					</div>
					<div class="col">
						<GoldRateCardWithCountry
							countryId="pakistan"
							rate={primaryCountryLatestGoldRate24KaretGold || 0 * getCountryExchangeRate('pakistan', countryRatesData)}
						/>
					</div>
					<div class="col">
						<GoldRateCardWithCountry
							countryId="india"
							rate={primaryCountryLatestGoldRate24KaretGold || 0 * getCountryExchangeRate('india', countryRatesData)}
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

	<GlobalRateTableAndTitle
		weights={[24, 22, 21, 18].map((n) => `${n} Karet/Tola`)}
		table_data={[
			countryRatesData.gold_rates_24_karat,
			countryRatesData.gold_rates_22_karat,
			countryRatesData.gold_rates_21_karat,
			countryRatesData.gold_rates_18_karat
		]}
		tableHeader={goldTableHeader}
		exchanges={countryRatesData.exchanges}
	>
		<svelte:fragment slot="title">
			<span class="text-danger">Per Tola</span> Gold Rate in {country.name} Converted into Pakistan, Indian, and Bangladeshi
			Currency
		</svelte:fragment>
	</GlobalRateTableAndTitle>

	<GlobalRateTableAndTitle
		weights={[24, 22, 21, 18].map((n) => `${n} Karet/Gram`)}
		table_data={[
			countryRatesDataInGram.gold_rates_24_karat,
			countryRatesDataInGram.gold_rates_22_karat,
			countryRatesDataInGram.gold_rates_21_karat,
			countryRatesDataInGram.gold_rates_18_karat
		]}
		tableHeader={goldTableHeader}
		exchanges={countryRatesData.exchanges}
	>
		<svelte:fragment slot="title">
			<span class="text-danger">Per Gram</span> Gold Rate in {country.name} Converted into Pakistan, Indian, and Bangladeshi
			Currency
		</svelte:fragment>
	</GlobalRateTableAndTitle>

	<GlobalRateTableAndTitle
		weights={['Ounce', 'Kilogram']}
		table_data={[countryRatesDataInKilogram.gold_rates_24_karat, countryRatesDataInOunce.gold_rates_24_karat]}
		tableHeader={goldTableHeader}
		exchanges={countryRatesData.exchanges}
	>
		<svelte:fragment slot="title">
			<span class="text-danger">Per Ounce and Kilogram</span> Gold Rate in {country.name} Converted into Pakistan, Indian,
			and Bangladeshi Currency
		</svelte:fragment>
	</GlobalRateTableAndTitle>

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
			Silver Rate in {country.name}
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
</style>
