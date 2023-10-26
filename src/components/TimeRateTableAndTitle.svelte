<script lang="ts">
	import BorderRoundedTitle from './BorderRoundedTitle.svelte';
	import TimeRateTable from './TimeRateTable.svelte';
	import countries from '@@asset/countries.json';
	export let countryId = '';

	export let table_data: any;
	export let exchanges: any;
	export let id = '';
	export let tableHeader: any;
	export let unit: string;
	export let karet: string;
	export let weights: string[];

	const country = countries.find((e) => e.id === countryId);

	export let isSilver = false;
</script>

<section {id} class="py-2 py-lg-5">
	<div class="width-of-navbar">
		<BorderRoundedTitle>
			<slot name="title" />
		</BorderRoundedTitle>

		<TimeRateTable {weights} {table_data} {tableHeader} {exchanges} {karet} {unit} />

		<!-- {#if isSilver} -->
		<!-- 	<RateTable -->
		<!-- 		table_data={{ -->
		<!-- 			table_id: '3423424', -->
		<!-- 			table_name: '', -->
		<!-- 			karat: 'rtr', -->
		<!-- 			seo_text: '', -->
		<!-- 			header: [ -->
		<!-- 				{ -->
		<!-- 					html: `${country?.name} <br/> ${country?.timezone}`, -->
		<!-- 					icon: 'time' -->
		<!-- 				}, -->
		<!-- 				{ -->
		<!-- 					html: 'Silver Type', -->
		<!-- 					icon: 'silver' -->
		<!-- 				}, -->
		<!-- 				{ -->
		<!-- 					html: `${country?.name} Silver Rate ${ -->
		<!-- 						country?.vat !== 0 && `<br/> Including ${(country?.vat || 0) * 100}% VAT` -->
		<!-- 					} <br/> ${country?.currency.code}`, -->
		<!-- 					icon: country?.imgCode -->
		<!-- 				}, -->
		<!-- 				{ -->
		<!-- 					html: 'Pakistan <br/> Silver Rate <br/> (₨)', -->
		<!-- 					icon: 'PK' -->
		<!-- 				}, -->
		<!-- 				{ -->
		<!-- 					html: 'India <br/> Silver Rate <br/> ($)', -->
		<!-- 					icon: 'IN' -->
		<!-- 				}, -->
		<!-- 				{ -->
		<!-- 					html: 'Bangladesh <br/> Silver Rate (৳)', -->
		<!-- 					icon: 'BD' -->
		<!-- 				} -->
		<!-- 			], -->
		<!-- 			body: [ -->
		<!-- 				['10:00 AM', '10 Gram', '', '', '', ''], -->
		<!-- 				['2:00 PM', 'Tola', '', '', '', ''], -->
		<!-- 				['6:00 PM', 'Ounce', '', '', '', ''], -->
		<!-- 				['8:00 PM', 'Kilogram', '', '', '', ''] -->
		<!-- 			] -->
		<!-- 		}} -->
		<!-- 	/> -->
		<!-- {:else if table_data} -->
		<!-- 	<RateTable {table_data} {tableHeader} /> -->
		<!-- {/if} -->
	</div>
</section>
