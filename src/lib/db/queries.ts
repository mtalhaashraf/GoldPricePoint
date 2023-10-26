export const API_URL = 'http://89.116.179.75:3000/';
// export const API_URL = 'http://localhost:3000/';

export async function query<T = any>(path: string, options: Record<string, any> = {}) {
	let pathWithParams = path;

	const params = options.params;
	if (params) {
		pathWithParams += '?' + new URLSearchParams(params).toString();
	}

	console.log(pathWithParams);

	return fetch(API_URL + pathWithParams, {
		headers: {
			'Content-Type': 'application/json'
		},
		...options
	})
		.then((res) => res.json())
		.then((data) => data as { status: number; msg: string; data: T });
}

export async function getExchangeRate(currency_code: string, date: string, isRecent = 1) {
	return query('currencies/exchange-rate', {
		params: {
			base_currency_code: currency_code,
			created_at: date,
			is_recent: isRecent
		}
	});
}

export async function getCountryRates(country_id: string, date: string, region_id: string = '') {
	const params: any = {
		country_id,
		date
	};

	if (region_id) {
		params.region_id = region_id;
	}

	return query('rates', {
		params
	});
}
