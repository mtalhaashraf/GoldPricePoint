import DataGenerator from '$lib/data_generator';
import type { IRateTable } from '@@component/component';
import countries from '@@asset/countries.json';
import { equals } from 'ramda';

export const load = async ({ fetch }) => {
	const country = countries.find((e) => equals(e.id)('united_arab_emirates'));

	const goldTableHeader = [
		{
			html: `${country?.name} <br/> ${country?.timezone}`,
			icon: 'time'
		},
		{
			html: 'Gold Type',
			icon: 'gold'
		},
		{
			html: `${country?.name} Gold Rate ${
				country?.vat !== 0 && `<br/> Including ${(country?.vat || 0) * 100}% VAT`
			} <br/> ${country?.currency.code}`,
			icon: country?.imgCode || ''
		},
		{
			html: 'Pakistan <br/> Gold Rate <br/> (₨)',
			icon: 'PK'
		},
		{
			html: 'India <br/> Gold Rate <br/> ($)',
			icon: 'IN'
		},
		{
			html: 'Bangladesh <br/> Gold Rate (৳)',
			icon: 'BD'
		}
	];

	const data_generator = new DataGenerator({
		country: country?.id || '',
		region: 'dubai',
		timezone: country?.timezone || '',
		fetch: fetch,
		date: '2023-04-01'
	});

	return {
		tola_24: await data_generator.get_data({ karat: 24, unit: 'tola', seo_text: '', headers: goldTableHeader }),
		tola_22: await data_generator.get_data({ karat: 22, unit: 'tola', seo_text: '', headers: goldTableHeader }),
		tola_21: await data_generator.get_data({ karat: 21, unit: 'tola', seo_text: '', headers: goldTableHeader }),
		tola_18: await data_generator.get_data({ karat: 18, unit: 'tola', seo_text: '', headers: goldTableHeader }),
		gram_24: await data_generator.get_data({ karat: 24, unit: 'gram', seo_text: '', headers: goldTableHeader }),
		gram_22: await data_generator.get_data({ karat: 22, unit: 'gram', seo_text: '', headers: goldTableHeader }),
		gram_21: await data_generator.get_data({ karat: 21, unit: 'gram', seo_text: '', headers: goldTableHeader }),
		gram_18: await data_generator.get_data({ karat: 18, unit: 'gram', seo_text: '', headers: goldTableHeader }),
		gold_per_ounce: await data_generator.get_data({ karat: 24, unit: 'ounce', seo_text: '', headers: goldTableHeader }),
		gold_per_kg: await data_generator.get_data({ karat: 24, unit: 'kg', seo_text: '', headers: goldTableHeader }),
		timezone: country?.timezone,
		country: country?.name,
		countryCode: country?.currency.code,
		imgCode: country?.imgCode,
		countryId: country?.id
	};
};
