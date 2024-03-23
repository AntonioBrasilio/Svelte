<script>
	import Home from './lib/pages/Home.svelte';
	import Settings from './lib/pages/Settings.svelte';
	import { settingsStore } from './lib/stores/settings';

	let page;

	function onHashChange() {
		const path = window.location.hash.slice(1);
		if (path === '/settings') {
			page = 'settings';
		} else {
			page = 'home';
		}
	}
</script>

<svelte:head>
	{#if $settingsStore.theme === 'dark'}
		<style>
			:root {
				--backgroundColor: #1d1d1d;
				--textColor: #fff;
			}
		</style>
	{:else}
		<style>
			:root {
				--backgroundColor: #ccc;
				--textColor: #1d1d1d;
			}
		</style>{/if}
</svelte:head>

<svelte:window on:hashchange={onHashChange} on:load={onHashChange} />

<nav>
	<a href="#/">Home</a>
	<a href="#/settings">Settings</a>
</nav>

{#if page === 'settings'}
	<Settings />
{:else}
	<Home />
{/if}

<style>
	a {
		margin-right: 10px;
		color: #fff;
	}
</style>
