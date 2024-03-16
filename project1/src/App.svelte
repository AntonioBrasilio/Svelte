<script>
	import Counter from './lib/Counter.svelte';
	import Button from './lib/Button.svelte';
	import ChevronCircleUp from 'svelte-icons/fa/FaChevronCircleUp.svelte';

	const counterProps = {
		counter1: 3,
		maxCounter2: 10
	};
</script>

<!-- <Counter {...counterProps} counterRestProp="string value" /> -->
<Button bgColor="red" textColor="white" size="large" shadow>
	<div class="left-icon" slot="leftContent">
		<ChevronCircleUp />
	</div>
	<span>This is my button</span>
</Button>

<style>
	.left-icon {
		width: 50px;
	}
</style>
