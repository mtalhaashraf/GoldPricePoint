import { generateDateString } from '$lib/utils/generateDateString';
import { writable } from 'svelte/store';

export const userSelectedData = writable({
	date: new Date(),
	dateString: generateDateString(new Date()),
	country: 'united_arab_emirates'
});
