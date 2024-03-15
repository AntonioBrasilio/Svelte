<script>
	export let size = 'large';
	export let shadow = false;
</script>

<button class:size-lg={size === 'large'} class:size-sm={size === 'small'} class:shadow>
	<slot>This is my fallback text</slot>
</button>

<style lang="scss">
	button {
		background-color: variables.$color;
		color: #fff;
		font-weight: bold;
		border: none;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
		cursor: pointer;
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
