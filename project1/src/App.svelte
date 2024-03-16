<script>
	import Counter from './lib/Counter.svelte';
	import Button from './lib/Button.svelte';

	const counterProps = {
		counter1: 3,
		maxCounter2: 10
	};
</script>

<!-- <Counter {...counterProps} counterRestProp="string value" /> -->
<Button bgColor="red" textColor="white" size="large" shadow>This is my button</Button>

<style>
</style>
