<svelte:options immutable={true} />

<script>
	import { onMount, tick } from 'svelte';
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todoList;

	let todos = null;
	let error = null;
	let isLoading = false;
	let isAdding = false;

	const loadTodos = async () => {
		isLoading = true;
		await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(async (response) => {
			if (response.ok) {
				todos = await response.json();
			} else {
				error = 'Failed to fetch todos';
			}
		});
		isLoading = false;
	};

	onMount(() => {
		loadTodos();
	});

	const handleAddTodo = async (e) => {
		e.preventDefault();
		isAdding = true;
		await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', {
			method: 'POST',
			body: JSON.stringify({
				title: e.detail.title,
				completed: false
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(async (response) => {
			if (response.ok) {
				const todo = await response.json();
				todos = [...todos, { ...todo, id: uuid() }];
				todoList.clearInput();
			} else {
				alert('Failed to add todo');
			}
		});
		isAdding = false;
		await tick();
		todoList.focusInput();
	};

	const handleRemoveTodo = (e) => {
		todos = todos.filter((todo) => todo.id !== e.detail.id);
	};

	const handleToggleTodo = (event) => {
		todos = todos.map((todo) => {
			if (todo.id === event.detail.id) {
				return {
					...todo,
					completed: event.detail.value
				};
			}
			return { ...todo };
		});
	};
</script>

<div style:max-width="300px">
	<TodoList
		bind:this={todoList}
		{error}
		{isLoading}
		{todos}
		disabled={isAdding}
		on:toggletodo={handleToggleTodo}
		on:removetodo={handleRemoveTodo}
		on:addtodo={handleAddTodo}
	/>
</div>

<style></style>
