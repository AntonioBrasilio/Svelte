<script>
	import { crossfade, scale } from 'svelte/transition';
	import Button from './Button.svelte';
	import { createEventDispatcher, afterUpdate } from 'svelte';
	import { flip } from 'svelte/animate';

	export let todos = null;
	export let inputValue = '';
	export let error = null;
	export let isLoading = false;
	export let disabled = false;
	export let disabledItems = [];
	export let scrollOnAdd = undefined;

	const [receive, send] = crossfade({
		duration: 400,
		fallback(node) {
			return scale(node, { start: 0.5, duration: 400 });
		}
	});

	$: done = todos ? todos.filter((todo) => todo.completed) : [];
	$: todo = todos ? todos.filter((todo) => !todo.completed) : [];

	let todoListDiv, listDivScrollHeight, autoscroll, input;
	let prevTodos = todos;
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

	export const focusInput = () => {
		input.focus();
	};

	$: {
		autoscroll = todos && prevTodos && todos.length > prevTodos.length;
		prevTodos = todos;
	}

	afterUpdate(() => {
		if (scrollOnAdd) {
			let pos;
			if (scrollOnAdd === 'top') {
				pos = 0;
			} else if (scrollOnAdd === 'bottom') {
				pos = todoListDiv.scrollHeight;
			}
			if (autoscroll) todoListDiv.scrollTo(0, pos);
			autoscroll = false;
		}
	});
</script>

<div class="todo-list-wrapper">
	{#if isLoading}
		<p class="display-text">Loading...</p>
	{:else if error}
		<p class="display-text">{error}</p>
	{:else if todos}
		<div bind:this={todoListDiv} class="todo-list">
			<div bind:offsetHeight={listDivScrollHeight}>
				{#if todos.length === 0}
					<p class="display-text">No todos to display</p>
				{:else}
					<div style:display="flex">
						{#each [todo, done] as list, index}
							<div class="list-wrapper">
								<h2>{index === 0 ? 'Todo' : 'Done'}</h2>
								<ul>
									{#each list as todo, index (todo.id)}
										{@const { id, title, completed } = todo}
										<li animate:flip>
											<slot>
												<div in:receive|local={{ key: id }} out:send|local={{ key: id }} class:completed>
													<label>
														<input
															disabled={disabledItems.includes(id)}
															on:input={(event) => {
																event.currentTarget.checked = completed;
																handleToggleTodo(id, !completed);
															}}
															type="checkbox"
															checked={completed}
														/>
														<slot {todo} {index} name="title">{title}</slot>
													</label>
													<button disabled={disabledItems.includes(id)} on:click={() => handleRemoveTodo(id)}
														>Remove</button
													>
												</div>
											</slot>
										</li>
									{/each}
								</ul>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
	<form on:submit|preventDefault={handleAddToto} class="add-todo-form">
		<input {disabled} placeholder="New todo" bind:this={input} bind:value={inputValue} />
		<Button {disabled} type="submit" size="small" bgColor="cadetblue">Add</Button>
	</form>
</div>

<style lang="scss">
	.todo-list-wrapper {
		background-color: #424242;
		border: 1px solid #4b4b4b;
		.display-text {
			margin: 0;
			padding: 15px;
			text-align: center;
		}
		.todo-list {
			max-height: 400px;
			overflow: auto;
			.list-wrapper {
				padding: 10px;
				flex: 1;
				h2 {
					margin: 0 0 10px;
				}
			}
			ul {
				margin: 0;
				padding: 0px;
				list-style: none;
				li > div {
					margin-bottom: 5px;
					display: flex;
					align-items: center;
					background-color: #303030;
					border-radius: 5px;
					padding: 10px;
					position: relative;
					justify-content: space-between;
					label {
						cursor: pointer;
						font-size: 18px;
						display: flex;
						align-items: baseline;
						padding-right: 20px;
						input[type='checkbox'] {
							margin: 0 10px 0 0;
							cursor: pointer;
						}
					}
					.completed {
						text-decoration: line-through;
					}
					&.completed > label {
						opacity: 0.5;
						text-decoration: line-through;
					}
					.remove-todo-button {
						border: none;
						background: none;
						padding: 5px;
						position: absolute;
						right: 10px;
						cursor: pointer;
						display: none;
						:global(svg) {
							fill: #bd1414;
						}
					}
					&:hover {
						.remove-todo-button {
							display: block;
						}
					}
				}
			}
		}
		.add-todo-form {
			padding: 15px;
			background-color: #303030;
			display: flex;
			border-top: 1px solid #4b4b4b;
			// :global(.add-todo-button) {
			//   background-color: aqua;
			// }
			input {
				flex: 1;
				background-color: #424242;
				border: 1px solid #4b4b4b;
				padding: 10px;
				color: #fff;
				border-radius: 5px;
				margin-right: 10px;
			}
		}
	}
</style>
