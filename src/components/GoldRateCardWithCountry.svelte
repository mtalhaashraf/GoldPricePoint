<script lang="ts">
	import countries from '@@asset/countries.json';
	export let rate: number;
	export let countryId = '';
	export let unit = 'Tola';

	const country = countries.find((e) => e.id === countryId);
	let description = `24 Karat Gold Rate (1 ${unit} in ${country?.name})`;
</script>

<div class="p-3 rate-card-with-country">
	<div class="card-wrapper">
		<div class="card-title">
			<h2 class="mb-0 text-warning fw-bolder">{country?.currency.code} {rate}</h2>
		</div>
		<div class="card-flag">
			<img src={`https://flagsapi.com/${country?.imgCode}/flat/64.png`} alt="" />
		</div>
		<div class="card-desc">
			<p class="mb-0 font-dm-sans responsive">{description}</p>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../scss/utils/' as *;
	.rate-card-with-country {
		width: 100%;
		border: 2px solid $warning;
		box-shadow: 0px 5px 0px $warning;
		border-radius: 1.4rem;
		text-align: center;
	}
</style>
