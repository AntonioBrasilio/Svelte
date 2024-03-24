<script>
	import { v4 as uuid } from 'uuid';
	import { getContext, onMount } from 'svelte';
	import { FORM_KEY } from './form-key.js';
	import { validateRequiredField } from '../utils/validation.js';

	const id = uuid();

	export let name = '';
	export let label = '';
	export let validate = undefined;
	export let type = undefined;

	const formStore = getContext(FORM_KEY);

	onMount(() => {
		if (validate && validateRequiredField($formStore.values[name])) {
			formStore.update((state) => {
				return {
					...state,
					errors: {
						...state.errors,
						[name]: validateRequiredField($formStore.values[name], label)
					}
				};
			});
		}
	});
</script>

<div class="field">
	{#if $formStore.errors[name]}
		<span class="required">{$formStore.errors[name]}</span>
	{/if}
	<label for={id}>{label}</label>
	<input
		on:input={(e) => {
			const value = e.currentTarget.value;
			if (validate && validate(value)) {
				formStore.update((state) => {
					return {
						...state,
						errors: {
							...state.errors,
							[name]: validate(value, label)
						}
					};
				});
			} else {
				formStore.update((state) => {
					state.errors = Object.keys(state.errors).reduce((acc, key) => {
						if (key !== name) {
							acc[key] = state.errors[key];
						}
						return acc;
					}, {});
					return {
						...state
					};
				});
			}
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
	.required {
		color: red;
		font-size: 12px;
	}
</style>
