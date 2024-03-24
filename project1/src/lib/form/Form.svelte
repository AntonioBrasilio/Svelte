<script>
	import { createEventDispatcher, setContext } from 'svelte';
	import { FORM_KEY } from './form-key.js';
	import { writable } from 'svelte/store';

	export let initialValues = {};

	const dispatch = createEventDispatcher();

	const form = writable({
		values: initialValues,
		errors: {}
	});

	setContext(FORM_KEY, form);
</script>

<pre>
	{JSON.stringify($form, null, 2)}
</pre>
<form
	on:submit|preventDefault={() => {
		dispatch('submit', $form.values);
	}}
>
	<slot />
</form>
