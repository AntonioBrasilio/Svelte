<script>
	import Counter from './lib/Counter.svelte';

	const props = {
		counter1: 3,
		maxCounter2: 10
	};
</script>

<Counter {...props} restProp="string value" />

<style>
</style>
