import { writable } from 'svelte/store';

export const settings = writable({
	theme: 'dark',
	language: 'en',
	fontSize: '12px'
});
