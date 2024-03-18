<svelte:options immutable={true} />

<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	const handleAddTodo = (e) => {
		e.preventDefault();
		todos = [
			...todos,
			{
				id: uuid(),
				title: e.detail.title,
				completed: false
			}
		];
		todoList.clearInput();
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

	let todoList;

	let todos = [
		{
			id: uuid(),
			title: 'Todo 1',
			completed: true
		},
		{
			id: uuid(),
			title: 'Todo 2',
			completed: false
		},
		{
			id: uuid(),
			title: 'Todo 3',
			completed: false
		}
	];
</script>

<div style:max-width="300px">
	<TodoList bind:this={todoList} {todos} on:toggletodo={handleToggleTodo} on:removetodo={handleRemoveTodo} on:addtodo={handleAddTodo} />
</div>

<style></style>
