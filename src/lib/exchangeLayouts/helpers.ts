import moment from 'moment-timezone';
import countries from '@@asset/countries.json';

type GoldRateType = {
	createdAt: string;
	rate: number | null;
};

export function calculateLatestGoldRate(rates: GoldRateType[]) {
	const sortedPrices = [...rates].sort((a, b) => {
		return moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1;
	});

	return sortedPrices[sortedPrices.length - 1];
}

export function getCountryFromId(countryId: string) {
	return countries.find((e) => e.id === countryId);
}

export function getCountryExchangeRate(countryId: string, countryRatesData: any) {
	const currencyCode = countries.find((e) => e.id === countryId)?.currency.code;
	return countryRatesData.exchanges.find((item: any) => item.target_currency_code === currencyCode).conversion_rate;
}

export function getGramFromTola(tola: number) {
	// return tola * 11.664;
	return tola / 11.664;
}

export function getKilogramFromTola(tola: number) {
	// return tola * 0.011664;
	return tola * 85.7338820302;
}

export function getOunceFromTola(tola: number) {
	// return tola * 0.3732417216;
	return tola * 2.667;
}

export function getLayoutGoldTableHeader(country: any) {
	function getLayoutAGoldTableHeader(country: any) {
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
					country?.vat !== 0 ? `<br/> Including ${(country?.vat || 0) * 100}% VAT` : ''
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

		return goldTableHeader;
	}

	function getLayoutBGoldTableHeader() {
		const goldTableHeader = [
			{
				html: 'Gold Weight',
				icon: 'scale'
			},
			{
				html: 'Morning <br /> 10:00 AM',
				icon: 'time'
			},
			{
				html: 'Afternoon <br /> 10:00 AM',
				icon: 'time'
			},
			{
				html: 'Evening <br /> 10:00 AM',
				icon: 'time'
			},
			{
				html: 'Night <br /> 10:00 AM',
				icon: 'time'
			},
			{
				html: 'Yesterday <br /> Closing',
				icon: 'time'
			}
		];

		return goldTableHeader;
	}

	function getLayoutCGoldTableHeader(country: any) {
		const goldTableHeader = [
			{
				html: 'Gold',
				icon: 'gold'
			},
			{
				html: `${country?.name} <br/> (${country?.currency.symbol})`,
				icon: country?.imgCode || ''
			},
			{
				html: 'Pakistan <br/> (₨)',
				icon: 'PK'
			},
			{
				html: 'India <br/> ($)',
				icon: 'IN'
			},
			{
				html: 'Bangladesh <br/> (৳)',
				icon: 'BD'
			}
		];

		return goldTableHeader;
	}

	switch (country.layout) {
		case 'A':
			return getLayoutAGoldTableHeader(country);
		case 'B':
			return getLayoutBGoldTableHeader();
		case 'C':
			return getLayoutCGoldTableHeader(country);
	}
}

export function getSilverTableHeader(country: any) {
	const silverTableHeader = [
		{
			html: 'Silver',
			icon: 'silver'
		},
		{
			html: `${country?.name} <br/> ${country?.currency.code}`,
			icon: country?.imgCode || ''
		},
		{
			html: 'Pakistan <br/> (₨)',
			icon: 'PK'
		},
		{
			html: 'India <br/> ($)',
			icon: 'IN'
		},
		{
			html: 'Bangladesh <br/> (৳)',
			icon: 'BD'
		}
	];

	return silverTableHeader;
}
