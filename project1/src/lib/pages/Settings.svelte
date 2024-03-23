<script>
	import { settingsStore } from '../stores/settings.js';
	import { direction } from '../stores/direction.js';
</script>

<h2>Settings</h2>

<label>
	<input type="radio" bind:group={$settingsStore.theme} value="light" name="colorScheme" />
	Light
</label>
<label>
	<input type="radio" bind:group={$settingsStore.theme} value="dark" name="colorScheme" />
	Dark
</label>
<p>Language: {$settingsStore.language}</p>
<p>Direction: {$direction}</p>

<button on:click={() => settingsStore.reset()}>Go to default settings</button>
<button
	on:click={() => {
		settingsStore.update((prevSettings) => {
			return {
				...prevSettings,
				language: prevSettings.language === 'en' ? 'ar' : 'en'
			};
		});
	}}
	>Change language
</button>
