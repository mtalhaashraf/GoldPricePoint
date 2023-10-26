import type { ParamMatcher } from '@sveltejs/kit';
import countries from '@@asset/countries.json';
import { equals, includes, toLower } from 'ramda';

const notAvailableCountries = ['pakistan', 'india', 'bangladesh'];

export const match = ((param) => {
	if (notAvailableCountries.includes(param.toLocaleLowerCase())) {
		return false;
	} else return countries.map((data) => data.id).includes(param.toLowerCase());
}) satisfies ParamMatcher;
