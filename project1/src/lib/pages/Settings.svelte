<script>
	import { settings } from '../stores/settings.js';
</script>

<h2>Settings</h2>

<label>
	<input type="radio" bind:group={$settings.theme} value="light" name="colorScheme" />
	Light
</label>
<label>
	<input type="radio" bind:group={$settings.theme} value="dark" name="colorScheme" />
	Dark
</label>
