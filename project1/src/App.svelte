<script>
	import Counter from './lib/Counter.svelte';
	import Button from './lib/Button.svelte';
	import { FaChevronCircleDown, FaChevronCircleUp } from 'svelte-icons/fa';

	const counterProps = {
		counter1: 3,
		maxCounter2: 10
	};
</script>

<!-- <Counter {...counterProps} counterRestProp="string value" /> -->
<Button disabled on:click|once={() => alert(true)} bgColor="red" textColor="white" size="large" shadow>
	<div let:isMouseHover class="left-icon" slot="leftContent">
		{#if isMouseHover}
			<FaChevronCircleUp />
		{:else}
			<FaChevronCircleDown />
		{/if}
	</div>
	<span>This is my button</span>
</Button>

<style>
	.left-icon {
		width: 50px;
	}
</style>
