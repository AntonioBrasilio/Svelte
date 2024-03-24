<script>
	import { location } from '../stores/location.js';
	import { Field, Form } from '../form';
	import Button from '../Button.svelte';
	import { validateRequiredField } from '../utils/validation.js';

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

<Form
	on:submit={(e) => {
		console.log(e.detail);
	}}
	{initialValues}
>
	<Field label="Username" name="username" type="text" validate={validateRequiredField} />
	<Field label="Email" name="email" type="email" validate={validateRequiredField} />
	<Field label="Password" name="password" type="password" validate={validateRequiredField} />
	<Button type="submit" bgColor="red">Submit</Button>
</Form>
