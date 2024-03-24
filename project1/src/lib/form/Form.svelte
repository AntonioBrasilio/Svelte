<script>
	import { setContext } from 'svelte';
	import { FORM_KEY } from './form-key.js';

	export let initialValues = {};

	setContext(FORM_KEY, { values: initialValues, errors: {} });
</script>

<form>
	<slot />
</form>
