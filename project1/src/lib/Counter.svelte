<script>
	let counter1 = 0;
	let counter2 = 0;
	let counter3 = 0;

	const setCounter3 = (x, y) => {
		counter3 = x + y;
	};

	$: setCounter3(counter1, counter2); // Working only because is above the textCounter3
	$: textCounter3 = `The value for counter 3 is ${counter3}`; // Counter3 is only updating when counter1 or counter2 changes and the setCounter is above this line

	const increment1 = () => {
		counter1 += 1;
	};

	const increment2 = () => {
		counter2 += 1;
	};
</script>

<button on:click={increment1}> Clicks {counter1}</button>
<button on:click={increment2}> Clicks {counter2}</button>
<h4>{textCounter3}</h4>

<style>
	button {
		padding: 15px 20px;
	}
</style>
