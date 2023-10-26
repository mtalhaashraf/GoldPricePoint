import type { ParamMatcher } from '@sveltejs/kit';

const availableCountry = ['saudi-arabia', 'kuwait', 'qatar', 'bahrain', 'oman', 'dubai'];

export const match = ((param) => {
	return availableCountry.map((data) => data.toLowerCase()).includes(param.toLowerCase());
}) satisfies ParamMatcher;
