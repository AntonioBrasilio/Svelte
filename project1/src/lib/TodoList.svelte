<script>
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let todos = [];
	export let inputValue = '';

	const dispatch = createEventDispatcher();

	const handleAddToto = () => {
		if (!inputValue) return;
		const isNotCancelled = dispatch(
			'addtodo',
			{
				title: inputValue
			},
			{ cancelable: true }
		);
		if (isNotCancelled) {
			inputValue = '';
		}
	};
</script>

<div class="todo-list-wrapper">
	<ul>
		{#each todos as { id, title }, index (id)}
			{@const number = index + 1}
			<li>{number} - {title}</li>
		{/each}
	</ul>
</div>
<form on:submit|preventDefault={handleAddToto} class="add-todo-form">
	<input bind:value={inputValue} />
	<Button type="submit" size="small" bgColor="cadetblue">Add</Button>
</form>
