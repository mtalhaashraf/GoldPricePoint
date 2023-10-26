import type { PageLoad } from '../../[country]/[region]/$types';
import countries from '@@asset/countries.json';
import { equals } from 'ramda';
import { error } from '@sveltejs/kit';
import { userSelectedData } from '$lib/stores/userSelectedData';
import { getLayoutGoldTableHeader, getSilverTableHeader } from '$lib/exchangeLayouts/helpers';
import { getCountryRates, getExchangeRate } from '$lib/db/queries';
import moment from 'moment-timezone';

export const load = (async ({ params }) => {
	const country = countries.find((e) => equals(e.id)(params.country));
	const region = country?.regions?.find((e) => equals(e.id)(params.region));

	if (!country) throw error(404, 'Country not found');
	if (!region) throw error(404, 'Region not found');

	userSelectedData.update((e) => ({ ...e, country: country.id }));

	const countryRatesData: any = await getCountryRates(country.id, moment().format('YYYY-MM-DD'));
	const exchangeRatesData: any = await getExchangeRate(country.currency.code, moment().format('YYYY-MM-DD'));

	console.log('countryRatesData', countryRatesData);
	console.log('exchangeRatesData', exchangeRatesData);

	countryRatesData.exchanges = exchangeRatesData;

	if (!countryRatesData.gold_rates_24_karat) throw error(404, 'Data Not Available');
	if (exchangeRatesData.some((e: any) => e === null)) throw error(404, 'Data Not Available');

	return {
		region,
		country,
		countryRatesData,
		exchangeRatesData,
		goldTableHeader: getLayoutGoldTableHeader(country),
		silverTableHeader: getSilverTableHeader(country)
	};
}) satisfies PageLoad;
