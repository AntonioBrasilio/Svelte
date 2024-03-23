<script>
	import { location } from '../stores/location.js';
	import { settingsStore } from '../stores/settings.js';
</script>

<h2>Home</h2>

{#if $location && !Object($location).error}
	<p>Latitude: {Object($location).latitude}</p>
	<p>Longitude: {Object($location).longitude}</p>
{:else if Object($location).error}
	<p>{Object($location).error.message}</p>
{/if}
