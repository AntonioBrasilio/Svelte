<svelte:options immutable={true} />

<script>
	import { onMount, tick } from 'svelte';
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { fade, fly } from 'svelte/transition';
	import { spin } from './lib/transitions/spin';
	import { customFade } from './lib/transitions/customFade';
	import { longpress } from './lib/actions/longpress';

	let todoList;

	let todos = null;
	let error = null;
	let isLoading = false;
	let isAdding = false;
	let showList = true;
	let disabledItems = [];

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
				todos = [{ ...todo, id: uuid() }, ...todos];
				todoList.clearInput();
			} else {
				alert('Failed to add todo');
			}
		});
		isAdding = false;
		await tick();
		todoList.focusInput();
	};

	const handleRemoveTodo = async (e) => {
		const id = e.detail.id;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: 'DELETE'
		}).then((response) => {
			if (response.ok) {
				todos = todos.filter((todo) => todo.id !== id);
			} else {
				alert('Failed to remove todo');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	};

	const handleToggleTodo = async (event) => {
		const id = event.detail.id;
		const value = event.detail.value;
		if (disabledItems.includes(id)) return;
		disabledItems = [...disabledItems, id];
		await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				completed: value
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		}).then(async (response) => {
			if (response.ok) {
				const updatedTodo = await response.json();
				console.log(updatedTodo);
				todos = todos.map((todo) => {
					if (todo.id === id) {
						return { ...todo, completed: updatedTodo.completed };
					}
					return { ...todo };
				});
				console.log(todos);
			} else {
				alert('Failed to update todo');
			}
		});
		disabledItems = disabledItems.filter((itemId) => itemId !== id);
	};
</script>

<label class="show-hide-button">
	<input type="checkbox" bind:checked={showList} />
	{showList ? 'Show' : 'Hide'} list
</label>
{#if showList}
	<div transition:fade style:max-width="800px">
		<TodoList
			bind:this={todoList}
			{error}
			{isLoading}
			{todos}
			{disabledItems}
			disabled={isAdding}
			scrollOnAdd="top"
			on:toggletodo={handleToggleTodo}
			on:removetodo={handleRemoveTodo}
			on:addtodo={handleAddTodo}
		>
			<span let:todo let:index slot="title">{index} - {todo.title}</span>
		</TodoList>
	</div>
	{#if todos}
		<p>
			Number of Todos:
			{#key todos.length}
				<span style="display:inline-block" in:fly|local={{ y: -10 }}>{todos.length}</span>
			{/key}
		</p>
	{/if}
{/if}

<button
	on:longpress={() => {
		alert('Pressed');
	}}
	use:longpress={{ duration: 3000 }}>Teste</button
>

<style></style>
