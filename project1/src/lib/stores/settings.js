import { writable } from 'svelte/store';

const defaultSettings = {
	theme: 'dark',
	language: 'en',
	fontSize: '12px'
};

const { subscribe, set, update } = writable({ ...defaultSettings });

export const settingsStore = {
	subscribe,
	set,
	update,
	reset: () => {
		set({ ...defaultSettings });
	},
	updateSetting: (setting, value) => {
		update((settings) => {
			return { ...settings, [setting]: value };
		});
	},
	toggleColorScheme: () => {
		update((settings) => {
			const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
			return { ...settings, theme: newTheme };
		});
	}
};
