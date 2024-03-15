<script>
	let counter = 0;

	const increment = () => {
		counter += 1;
	};
</script>

<button on:click={increment}> Clicks {counter}</button>

<style>
	button {
		padding: 15px 20px;
	}
</style>
