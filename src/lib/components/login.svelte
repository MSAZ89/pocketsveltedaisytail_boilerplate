<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth, login } from '$lib/pocketbase.svelte';

	// svelte-ignore non_reactive_update
	let email = '';
	// svelte-ignore non_reactive_update
	let password = '';
	let error = $state('');

	const handleLogin = async (e: Event) => {
		e.preventDefault(); // Prevent default form submission
		error = ''; // Reset error message

		try {
			await login(email, password);

			// Redirect on successful login
			if (auth.isAuthenticated) {
				goto('/dashboard'); // Adjust the redirect path as needed
			}
		} catch (err) {
			// Handle login error
			error = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
		}
	};
</script>

<form onsubmit={handleLogin} class="flex flex-col space-y-4">
	{#if error}
		<div class="mb-4 text-red-500">{error}</div>
	{/if}

	<input
		type="email"
		bind:value={email}
		placeholder="Email"
		class="rounded border p-2"
		aria-label="Email"
		required
	/>
	<input
		type="password"
		bind:value={password}
		placeholder="Password"
		class="rounded border p-2"
		aria-label="Password"
		required
	/>
	<button type="submit" class="btn btn-primary" aria-label="Login"> Login </button>
</form>
