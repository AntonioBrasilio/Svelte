<script>
	import { v4 as uuid } from 'uuid';
	import { getContext } from 'svelte';
	import { FORM_KEY } from './form-key.js';

	const id = uuid();

	export let name = '';
	export let label = '';
	export let validate = undefined;
	export let type = undefined;

	const formStore = getContext(FORM_KEY);
</script>

<div class="field">
	<label for={id}>{label}</label>
	<input
		on:input={(e) => {
			const value = e.currentTarget.value;
			formStore.update((state) => {
				return {
					...state,
					values: {
						...state.values,
						[name]: value
					}
				};
			});
		}}
		{id}
		{name}
		{type}
		value={$formStore.values[name] || ''}
	/>
</div>

<style>
	div.field {
		margin-bottom: 10px;
	}

	label {
		display: block;
		margin-bottom: 5px;
		font-size: 14px;
	}
	input {
		height: 30px;
		width: 250px;
		max-width: 100%;
	}
</style>
