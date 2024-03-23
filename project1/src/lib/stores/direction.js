import { derived } from 'svelte/store';
import { settingsStore } from './settings';

export const direction = derived(
	settingsStore,
	($settings, set) => {
		set($settings.language === 'ar' ? 'rtl' : 'ltr');
	},
	'Not defined'
);
