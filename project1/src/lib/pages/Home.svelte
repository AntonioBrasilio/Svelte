<script>
	import { settings } from '../stores/settings.js';
	import { location } from '../stores/location.js';
</script>

<h2>Home</h2>

{#if $location && Object($location).error}
	<p>Latitude: {Object($location).latitude}</p>
	<p>Longitude: {Object($location).longitude}</p>
{:else if $location}
	<p>{Object($location).error.message}</p>
{/if}
