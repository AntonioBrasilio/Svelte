<script>
	import { location } from '../stores/location.js';
	import { Field, Form } from '../form';
	import Button from '../Button.svelte';

	let initialValues = {
		username: 'Test',
		email: 'teste@teste.com'
	};
</script>

<h2>Home</h2>

{#if $location && !Object($location).error}
	<p>Latitude: {Object($location).latitude}</p>
	<p>Longitude: {Object($location).longitude}</p>
{:else if Object($location).error}
	<p>{Object($location).error.message}</p>
{/if}

<Form {initialValues}>
	<Field label="Username" name="username" type="text" validate={() => {}} />
	<Field label="Email" name="email" type="email" validate={() => {}} />
	<Field label="Password" name="password" type="password" validate={() => {}} />
	<Button type="submit" bgColor="red">Submit</Button>
</Form>
