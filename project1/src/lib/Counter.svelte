<script>
	let counter = 0;

	$: textCounter = `The button has been clicked ${counter} times.`;

	$: if (counter > 5) {
		console.log('counter:', counter);
	}

	const increment = () => {
		counter += 1;
	};
</script>

<button on:click={increment}> Clicks {counter}</button>
<h3>{textCounter}</h3>

<style>
	button {
		padding: 15px 20px;
	}
</style>
