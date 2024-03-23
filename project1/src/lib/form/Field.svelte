<script>
	import { v4 as uuid } from 'uuid';

	const id = uuid();

	export let name = '';
	export let label = '';
	export let validate = undefined;
	export let type = undefined;
</script>

<div class="field">
	<label for={id}>{label}</label>
	<input {id} {name} {type} />
</div>

<style>
	div.field {
		margin-bottom: 10px;
	}

	label {
		display: block;
		margin-bottom: 5px;
		font-size: 14px;
	}
	input {
		height: 30px;
		width: 250px;
		max-width: 100%;
	}
</style>
