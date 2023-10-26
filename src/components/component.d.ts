export interface IRateTable {
	table_name: string;
	table_id: string;
	karat: 24 | 22 | 21 | 18 | string;
	seo_text: string;
	header: {
		html: string;
		icon: string;
	}[];
	body: string[][];
}
