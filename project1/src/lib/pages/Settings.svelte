<script>
	import { onDestroy } from 'svelte';
	import { settings } from '../stores/settings.js';

	let colorScheme;

	const unsubscribe = settings.subscribe((settings) => {
		colorScheme = settings.theme;
	});

	$: {
		settings.update((prevSettings) => {
			return {
				...prevSettings,
				theme: colorScheme
			};
		});
	}

	onDestroy(unsubscribe);
</script>

<h2>Settings</h2>

<label>
	<input type="radio" bind:group={colorScheme} value="light" name="colorScheme" />
	Light
</label>
<label>
	<input type="radio" bind:group={colorScheme} value="dark" name="colorScheme" />
	Dark
</label>
