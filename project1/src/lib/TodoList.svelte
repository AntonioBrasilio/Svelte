<script>
	import Button from './Button.svelte';
	import { createEventDispatcher, afterUpdate } from 'svelte';

	export let todos = [];
	export let inputValue = '';
	let todoListDiv;
	let autoscroll;

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

	export const clearInput = () => {
		inputValue = '';
	};

	let input;
	export const focusInput = () => {
		input.focus();
	};

	let prevTodos = todos;

	$: {
		autoscroll = todos.length > prevTodos.length;
		prevTodos = todos;
	}

	afterUpdate(() => {
		if (autoscroll) todoListDiv.scrollTo(0, todoListDiv.scrollHeight);
		autoscroll = false;
	});
</script>

<div class="todo-list-wrapper">
	<div bind:this={todoListDiv} class="todo-list">
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
</div>
<form on:submit|preventDefault={handleAddToto} class="add-todo-form">
	<input bind:this={input} bind:value={inputValue} />
	<Button type="submit" size="small" bgColor="cadetblue">Add</Button>
</form>

<style>
	.todo-list {
		max-height: 150px;
		overflow: auto;
	}
</style>
