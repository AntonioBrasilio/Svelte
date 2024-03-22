<script>
	import { onDestroy } from 'svelte';
	import { settings } from '../stores/settings.js';

	let colorScheme;

	const unsubscribe = settings.subscribe((settings) => {
		colorScheme = settings.theme;
	});

	onDestroy(unsubscribe);
</script>

<h2>Home</h2>
