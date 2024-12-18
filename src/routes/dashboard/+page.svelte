<script>
	import { logout } from '$lib/pocketbase.svelte';
	import { auth } from '$lib/pocketbase.svelte';
</script>

{#if auth.isAuthenticated}
	<div
		class="bg-primary-content border-primary flex flex-wrap items-center justify-between gap-4 rounded border-b p-2 md:w-1/2 md:p-8"
	>
		<div>
			<h1 class="text-primary text-2xl font-semibold tracking-wide">Dashboard</h1>
			<p class="text-base-content tracking-tight">Welcome, {auth.user?.email}</p>
		</div>
		<button on:click={logout} class="btn btn-error" aria-label="Logout"> Logout </button>
	</div>
{/if}
