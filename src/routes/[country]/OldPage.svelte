<script lang="ts">
	import BorderRoundedTitle from '@@component/BorderRoundedTitle.svelte';
	import GoldRateCalculator from '@@component/GoldRateCalculator.svelte';
	import GoldRateCardWithCountry from '@@component/GoldRateCardWithCountry.svelte';
	import RateTableAndTitle from '@@component/RateTableAndTitle.svelte';
	import WebsiteHeader from '@@component/WebsiteHeader.svelte';
	import moment from 'moment-timezone';

	export let data: any;
	const now = moment.tz(data.timezone);
	const timezoneName = `${data.countryCode} Standard Time`;
</script>

<main>
	<WebsiteHeader />
	<section class="py-5 px-2 px-sm-0">
		<div class="section-container width-of-navbar">
			<BorderRoundedTitle className="my-4">{data.country} Gold Rate in Pakistan and Indian Currency</BorderRoundedTitle>
			<div class="m-2 note m-md-3 m-lg-4 m-lg-5">
				<p class="text-center responsive font-dm-sans">
					<strong>LAST</strong> Updated on {now.format(`dddd, MMMM D, YYYY, h:mm A [${timezoneName}]`)}
				</p>
			</div>

			<div class="cards-container">
				<div class="m-0 cards-flex row row-cols-lg-3 row-cols-sm-2 g-3 justify-content-center w-100 row-cols-1">
					<div class="col">
						<GoldRateCardWithCountry countryId={data.countryId} rate={9283982} />
					</div>
					<div class="col">
						<GoldRateCardWithCountry countryId="pakistan" rate={9283982} />
					</div>
					<div class="col">
						<GoldRateCardWithCountry countryId="india" rate={9283982} />
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

	<!-- All Tola Gold rate -->
	{#if data.tola_24}
		<RateTableAndTitle table_data={data.tola_24}>
			<svelte:fragment slot="title">
				24 Karat Gold Rate <span class="text-danger">Per Tola</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}
	{#if data.tola_22}
		<RateTableAndTitle table_data={data.tola_22}>
			<svelte:fragment slot="title">
				22 Karat Gold Rate <span class="text-danger">Per Tola</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}
	{#if data.tola_21}
		<RateTableAndTitle table_data={data.tola_21}>
			<svelte:fragment slot="title">
				21 Karat Gold Rate <span class="text-danger">Per Tola</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}
	{#if data.tola_18}
		<RateTableAndTitle table_data={data.tola_18}>
			<svelte:fragment slot="title">
				18 Karat Gold Rate <span class="text-danger">Per Tola</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}

	<!-- All Gram Gold Rate -->
	{#if data.gram_24}
		<RateTableAndTitle table_data={data.gram_24}>
			<svelte:fragment slot="title">
				24 Karat Gold Rate <span class="text-danger">Per Gram</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}
	{#if data.gram_22}
		<RateTableAndTitle table_data={data.gram_22}>
			<svelte:fragment slot="title">
				22 Karat Gold Rate <span class="text-danger">Per Gram</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}
	{#if data.gram_21}
		<RateTableAndTitle table_data={data.gram_21}>
			<svelte:fragment slot="title">
				21 Karat Gold Rate <span class="text-danger">Per Gram</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}
	{#if data.gram_18}
		<RateTableAndTitle table_data={data.gram_18}>
			<svelte:fragment slot="title">
				18 Karat Gold Rate <span class="text-danger">Per Gram</span> in {data.country} Converted into Pakistan, Indian, and
				Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}

	<!-- Per Ounce GoldRate -->
	{#if data.gold_per_ounce}
		<RateTableAndTitle table_data={data.gold_per_ounce}>
			<svelte:fragment slot="title">
				24 Karat Gold Rate <span class="text-danger">Per Ounce</span> in {data.country} Converted into Pakistan, Indian,
				and Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}

	<!-- Per Ounce GoldRate -->
	{#if data.gold_per_kg}
		<RateTableAndTitle table_data={data.gold_per_ounce}>
			<svelte:fragment slot="title">
				24 Karat Gold Rate <span class="text-danger">Per Kilogram</span> in {data.country} Converted into Pakistan, Indian,
				and Bangladeshi Currency
			</svelte:fragment>
		</RateTableAndTitle>
	{/if}

	<!-- Calculator -->
	<GoldRateCalculator />

	<br />

	<RateTableAndTitle isSilver={true} countryId={data.countryId} table_data={data.gold_per_ounce}>
		<svelte:fragment slot="title">
			Silver Rate in {data.country} Converted into Pakistan, Indian, and Bangladeshi Currency
		</svelte:fragment>
	</RateTableAndTitle>

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

<!-- <style lang="scss">
	@use '../../scss/pages/(Website)/HomePage.scss' as *;
</style> -->
