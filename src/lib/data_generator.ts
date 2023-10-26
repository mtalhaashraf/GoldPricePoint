import type { IRateTable } from '@@component/component';
import { api_base } from '../helpers/api_info';
import { DateTime } from 'luxon';
import { iso_to_local, utcIso } from '$lib/dt';

type TGoldKarats = 24 | 22 | 21 | 18;
type TGoldUnits = 'tola' | 'ounce' | 'gram' | 'kg';
type Fetch = typeof fetch;

const karate_percentage_ratio = {
	karat_24: 1,
	karat_22: 0.9166,
	karat_21: 0.875,
	karat_18: 0.75
};

const tola_to_unit = {
	tola_to_gram: 11.668, // Divider;
	tola_to_ounce: 2.667,
	tola_to_kg: 85.7338820302
};
const exchange_in_countries = { BD: 'bangladesh', PK: 'pakistan', IN: 'india' };

type TDataGeneRatorParams = {
	gold_types?: TGoldKarats[];
	gold_units?: TGoldUnits[];
	timezone: string;
	date: string;
	country: string;
	region: string;
	fetch: Fetch;
};

interface TGetDataOptions {
	karat: TGoldKarats;
	unit: TGoldUnits;
	seo_text: string;
	headers?: {
		html: string;
		icon: string;
	}[];
	table_name?: string;
	table_id?: string;
}

// interface DataGeneratorProperties extends TDataGeneRatorParams {
// 	time_zone: string;
// }

type TConversionMethodParam = {
	karat: TGoldKarats;
	unit: TGoldUnits;
	gold_rate: string | number;
	exchange_currency: string | number;
};

/**
 * Data Generator. Frot
 */
class DataGenerator {
	config: TDataGeneRatorParams;
	api_data = {
		success: true,
		error: false,
		data: {
			_id: '64275e0a90552c1bbf5608a8',
			country_id: 'united_arab_emirates',
			region: 'dubai',
			exchanges: [
				{
					country_id: 'pakistan',
					rate: 77,
					_id: '64275e0a90552c1bbf5608a9',
					createdAt: '2023-03-31T22:26:18.399Z',
					updatedAt: '2023-03-31T22:26:18.399Z'
				},
				{
					country_id: 'bangladesh',
					rate: 29.14,
					_id: '64275e0a90552c1bbf5608aa',
					createdAt: '2023-03-31T22:26:18.399Z',
					updatedAt: '2023-03-31T22:26:18.399Z'
				},
				{
					country_id: 'india',
					rate: 22.37,
					_id: '64275e0a90552c1bbf5608ab',
					createdAt: '2023-03-31T22:26:18.400Z',
					updatedAt: '2023-03-31T22:26:18.400Z'
				}
			],
			gold_rate_24_karat: [
				{
					rate: 2542.43,
					time: '2023-04-01T06:00:00.000Z',
					_id: '64275e0a90552c1bbf5608ac',
					createdAt: '2023-03-31T22:26:18.400Z',
					updatedAt: '2023-03-31T22:26:18.400Z'
				},
				{
					rate: 2542.43,
					time: '2023-04-01T10:00:00.000Z',
					_id: '64275e0a90552c1bbf5608ad',
					createdAt: '2023-03-31T22:26:18.400Z',
					updatedAt: '2023-03-31T22:26:18.400Z'
				},
				{
					rate: 2542.43,
					time: '2023-04-01T14:00:00.000Z',
					_id: '64275e0a90552c1bbf5608ae',
					createdAt: '2023-03-31T22:26:18.400Z',
					updatedAt: '2023-03-31T22:26:18.400Z'
				},
				{
					rate: 2542.43,
					time: '2023-04-01T16:00:00.000Z',
					_id: '64275e0a90552c1bbf5608af',
					createdAt: '2023-03-31T22:26:18.400Z',
					updatedAt: '2023-03-31T22:26:18.400Z'
				}
			],
			createdAt: '2023-03-31T22:26:18.400Z',
			updatedAt: '2023-03-31T22:26:18.400Z',
			__v: 0
		}
	};

	constructor(config: TDataGeneRatorParams) {
		this.config = {
			gold_types: [],
			gold_units: [],
			...config
		};
	}

	private async load_server_data(region: string) {
		try {
			const res = await this.config.fetch(`${api_base}/exchange/get-by-region/${region}`);
			if (res.ok) {
				const data = await res.json();
				console.log(data);
			} else {
				console.error('Rejected with error', res.statusText);
			}
		} catch (e) {
			console.error(e);
		}
	}

	private price_by_karat(price_24_karat: number, karat: TGoldKarats) {
		switch (karat) {
			case 24:
				return price_24_karat;
			case 22:
				return price_24_karat * karate_percentage_ratio.karat_22;
			case 21:
				return price_24_karat * karate_percentage_ratio.karat_21;

			case 18:
				return price_24_karat * karate_percentage_ratio.karat_18;
		}
	}

	/* 	//This method will make conversion of gold rate and Currency and By unit;*/
	private conversion(param: TConversionMethodParam) {
		/**
		 * Here Unit is Gold Unit. Which unit user want to convert. By Default it is in Tola. Kg, gram, Ounce available
		 * Karat mean Karat. 24,22,21,18 karat available.
		 * gold_rate is the Rate fo Gold in User Desired Country. if They Selected Dubai. Gold rate will be in Dubai.
		 * Exchange Currency is the currency that to be converted into. in this Case Pakistan, Bangladesh, India available.
		 */
		const { unit, karat, gold_rate, exchange_currency } = param;

		const per_tola_24_karat = Number(gold_rate) * Number(exchange_currency);
		const per_gram_24_karat = per_tola_24_karat / tola_to_unit.tola_to_gram; //
		const per_kg_24_karat = per_tola_24_karat * tola_to_unit.tola_to_kg;
		const per_ounce_24_karat = per_tola_24_karat * tola_to_unit.tola_to_ounce;

		switch (unit) {
			case 'tola':
				return this.price_by_karat(per_tola_24_karat, karat);
			case 'gram':
				return this.price_by_karat(per_gram_24_karat, karat);
			case 'kg':
				//As Kg Doesn't Support Karat that's why Default Karat is 24.
				return this.price_by_karat(per_kg_24_karat, 24);
			case 'ounce':
				//As Ounce Doesn't Support Karat that's why Default Karat is 24.
				return this.price_by_karat(per_ounce_24_karat, 24);
		}
	}

	/**  Country_id should be from that country which will be converted into the price. example, pakistan,india
	 * Data will be come from api. See the APi Sample Data to Understood.
	 */
	private get_exchange(country_id: string) {
		return this.api_data.data.exchanges.find((c) => c.country_id === country_id);
	}

	/* Get Certain gold_rate log By ISO date time from API. */
	private get_gold_rate(ISO_date: string) {
		return this.api_data.data.gold_rate_24_karat.find((rates) => rates.time === utcIso(ISO_date, this.config.timezone));
	}

	private generate_body_element(time: string, gold_karat: TGoldKarats, gold_units: TGoldUnits) {
		const gold_rate = Number(this.get_gold_rate(time)?.rate);
		const exchange_currency = (country_id: string) => Number(this.get_exchange(country_id)?.rate);

		return [
			iso_to_local(time, this.config.timezone),
			`${gold_karat} Karat / ${gold_units}`,
			`${this.price_by_karat(gold_karat, gold_karat).toFixed(2)}`,
			`${this.conversion({
				unit: gold_units,
				karat: gold_karat,
				gold_rate,
				exchange_currency: exchange_currency(exchange_in_countries.PK)
			}).toFixed(2)}`,
			`${this.conversion({
				unit: gold_units,
				karat: gold_karat,
				gold_rate,
				exchange_currency: exchange_currency(exchange_in_countries.IN)
			}).toFixed(2)}`,
			`${this.conversion({
				unit: gold_units,
				karat: gold_karat,
				gold_rate,
				exchange_currency: exchange_currency(exchange_in_countries.BD)
			}).toFixed(2)}`
		];
	}

	private generate_body_for(karat: TGoldKarats, unit: TGoldUnits) {
		const body = [
			this.generate_body_element('2023-04-01T10:00:00', karat, unit),
			this.generate_body_element('2023-04-01T14:00:00', karat, unit),
			this.generate_body_element('2023-04-01T18:00:00', karat, unit),
			this.generate_body_element('2023-04-01T20:00:00', karat, unit)
		];
		return body;
	}

	public async get_data(options: TGetDataOptions): Promise<IRateTable> {
		const { headers, karat, seo_text, table_name, unit } = options;
		return {
			header: [
				headers?.[0] || { html: 'UEA Standard Time', icon: '' },
				headers?.[1] || { html: 'Gold Type', icon: '' },
				headers?.[2] || { html: '', icon: '' },
				headers?.[3] || { html: '', icon: '' },
				headers?.[4] || { html: '', icon: '' },
				headers?.[5] || { html: '', icon: '' }
			],
			seo_text,
			karat,
			table_id: 'te',
			table_name: table_name || '',
			body: this.generate_body_for(karat, unit)
		};
	}
}

export default DataGenerator;
