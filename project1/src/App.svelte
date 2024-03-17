<svelte:options immutable={true} />

<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';

	const handleAddTodo = (e) => {
		// e.preventDefault();
		todos = [
			...todos,
			{
				id: uuid(),
				title: e.detail.title,
				completed: false
			}
		];
	};

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

<TodoList {todos} on:addtodo={handleAddTodo} />

<style></style>
