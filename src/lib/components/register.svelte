<script lang="ts">
	import { signup } from '$lib/pocketbase.svelte';
	// svelte-ignore non_reactive_update
	let email = '';
	// svelte-ignore non_reactive_update
	let password = '';
	// svelte-ignore non_reactive_update
	let confirmPassword = '';
	// svelte-ignore non_reactive_update
	let error = '';
	// svelte-ignore non_reactive_update
	let success = '';
	// svelte-ignore non_reactive_update

	const handleSignup = async (e: Event) => {
		e.preventDefault();
		error = '';
		success = '';

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			error = 'Invalid email address.';
			return;
		}

		// Password confirmation
		if (password !== confirmPassword) {
			error = 'Passwords do not match.';
			return;
		}

		try {
			await signup(email, password);
			success = 'Signup successful!';
			// Redirect to dashboard
			location.pathname = '/dashboard';
		} catch (err) {
			error = err instanceof Error ? err.message : 'Signup failed. Please try again.';
		}
	};
</script>

<form onsubmit={handleSignup} class="flex flex-col space-y-4">
	{#if error}
		<div class="mb-4 text-red-500">{error}</div>
	{/if}
	{#if success}
		<div class="mb-4 text-green-500">{success}</div>
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
	<input
		type="password"
		bind:value={confirmPassword}
		placeholder="Confirm Password"
		class="rounded border p-2"
		aria-label="Confirm Password"
		required
	/>
	<button type="submit" class="btn btn-primary" aria-label="Sign Up"> Sign Up </button>
</form>
