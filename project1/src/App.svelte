<script>
	import Counter from './lib/Counter.svelte';

	const counterProps = {
		counter1: 3,
		maxCounter2: 10
	};
</script>

<Counter {...counterProps} counterRestProp="string value" />

<style>
</style>
