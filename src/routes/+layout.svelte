<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/navigation.svelte';
	let { children } = $props();
</script>

<main>
	<Navigation />
	<div
		class="bg-primary-content container mx-auto my-2 flex w-full flex-col items-center justify-center p-2 py-4"
	>
		{@render children()}
	</div>
</main>
