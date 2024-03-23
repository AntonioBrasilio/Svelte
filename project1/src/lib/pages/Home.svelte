<script>
	import { location } from '../stores/location.js';
	import { settingsStore } from '../stores/settings.js';
	import { Field, Form } from '../form';
	import Button from '../Button.svelte';
</script>

<h2>Home</h2>

{#if $location && !Object($location).error}
	<p>Latitude: {Object($location).latitude}</p>
	<p>Longitude: {Object($location).longitude}</p>
{:else if Object($location).error}
	<p>{Object($location).error.message}</p>
{/if}

<Form>
	<Field label="Username" name="username" type="text" validate={() => {}} />
	<Field label="Email" name="email" type="text" validate={() => {}} />
	<Field label="Password" name="password" type="text" validate={() => {}} />
	<Button type="submit" bgColor="red">Submit</Button>
</Form>
