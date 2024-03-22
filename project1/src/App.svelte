<script>
	import Home from './lib/pages/Home.svelte';
	import Settings from './lib/pages/Settings.svelte';

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
