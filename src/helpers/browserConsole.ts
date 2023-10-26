import { browser } from '$app/environment';

export function browserConsole(...arg: unknown[]) {
	if (browser) {
		console.log(...arg);
	}
}
