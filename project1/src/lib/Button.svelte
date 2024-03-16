<script>
	export let size = 'large';
	export let shadow = false;
	export let bgColor = 'inherit';
	export let textColor = 'inherit';
	export let isMouseHover = false;

	console.log($$slots);
</script>

<button
	{...$$restProps}
	on:click
	on:mouseenter={() => (isMouseHover = true)}
	on:mouseleave={() => (isMouseHover = false)}
	style:background-color={bgColor}
	style:--buttonTextColor={textColor}
	class:size-lg={size === 'large'}
	class:size-sm={size === 'small'}
	class:shadow
>
	{#if $$slots.leftContent}
		<div class="left-content">
			<slot name="leftContent" {isMouseHover} />
		</div>
	{/if}
	<slot>This is my fallback text</slot>
</button>

<style lang="scss">
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: variables.$color;
		color: var(--buttonTextColor);
		font-weight: bold;
		border: none;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		cursor: pointer;
		.left-content {
			margin-right: 10px;
		}
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
		&:hover {
			transform: scale(1.05);
			background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
		}
		&:active {
			transform: scale(0.95);
			background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3));
		}
		&.size-sm {
			padding: 15px 20px;
			font-size: 14px;
		}
		font-size: 16px;
		&.size-lg {
			padding: 25px 30px;
			font-size: 18px;
		}
		&.shadow {
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		}
	}
</style>
