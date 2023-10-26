// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
		interface Country {
			id: string;
			name: string;
			currency: {
				name: string;
				code: string;
				symbol: string;
			};
			imgCode: string;
			timezone: string;
			layout: string;
			regions?: Region[];
			vat?: number;
			active?: boolean;
		}
		interface Region {
			id: string;
			name: string;
			active?: boolean;
		}
	}
}

export {};
