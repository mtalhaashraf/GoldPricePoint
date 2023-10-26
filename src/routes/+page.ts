import type { PageLoad } from './$types';
import countries from '@@asset/countries.json';
import { equals } from 'ramda';
import { getLayoutGoldTableHeader, getSilverTableHeader } from '$lib/exchangeLayouts/helpers';
import { userSelectedData } from '$lib/stores/userSelectedData';
import { getCountryRates, getExchangeRate } from '$lib/db/queries';
import moment from 'moment';
import { error } from '@sveltejs/kit';

export const load = (async () => {
	const default_country = 'united_arab_emirates';
	const country = countries.find((e) => equals(e.id)(default_country));

	if (!country) throw error(404, 'country not found');

	userSelectedData.update((e) => ({ ...e, country: country!.id }));

	const countryRatesData: any = await getCountryRates(country.id, moment().format('YYYY-MM-DD'));
	const exchangeRatesData: any = await getExchangeRate(country.currency.code, moment().format('YYYY-MM-DD'));

	console.log('countryRatesData', countryRatesData);
	console.log('exchangeRatesData', exchangeRatesData);

	countryRatesData.exchanges = exchangeRatesData;

	if (!countryRatesData.gold_rates_24_karat) throw error(404, 'Data Not Available');
	if (exchangeRatesData.some((e: any) => e === null)) throw error(404, 'Data Not Available');

	return {
		country,
		countryRatesData,
		goldTableHeader: getLayoutGoldTableHeader(country),
		silverTableHeader: getSilverTableHeader(country)
	};
}) satisfies PageLoad;
