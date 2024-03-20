<svelte:options immutable={true} />

<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	let todoList;

	let todos = null;

	const loadTodos = () => {
		return fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then((response) => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Failed to fetch todos');
			}
		});
	};

	let promise = loadTodos();

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
</script>

{#await promise}
	<p>Loading...</p>
{:then todos}
	<div style:max-width="300px">
		<TodoList
			bind:this={todoList}
			{todos}
			on:toggletodo={handleToggleTodo}
			on:removetodo={handleRemoveTodo}
			on:addtodo={handleAddTodo}
		/>
	</div>
{:catch error}
	<p>{error.message || 'An error has occured'}</p>
{/await}
<button
	on:click={() => {
		promise = loadTodos();
	}}>Refresh</button
>

<style></style>
