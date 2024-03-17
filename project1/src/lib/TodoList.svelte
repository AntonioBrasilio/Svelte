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
	const handleRemoveTodo = (id) => {
		dispatch('removetodo', { id });
	};

	const handleToggleTodo = (id, value) => {
		dispatch('toggletodo', { id, value });
	};
</script>

<div class="todo-list-wrapper">
	<ul>
		{#each todos as { id, title, completed } (id)}
			<li>
				<label>
					<input
						on:input={(event) => {
							event.currentTarget.checked = completed;
							handleToggleTodo(id, !completed);
						}}
						type="checkbox"
						checked={completed}
					/>
					{title}
				</label>
				<button on:click={() => handleRemoveTodo(id)}>Remove</button>
			</li>
		{/each}
	</ul>
</div>
<form on:submit|preventDefault={handleAddToto} class="add-todo-form">
	<input bind:value={inputValue} />
	<Button type="submit" size="small" bgColor="cadetblue">Add</Button>
</form>
