import { readable } from 'svelte/store';

export const location = readable(window.location, (set) => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				// @ts-ignore
				set({ latitude, longitude });
			},
			(error) => {
				// @ts-ignore
				set({ error });
			}
		);
	}
	return () => {
		set(null);
	};
});
