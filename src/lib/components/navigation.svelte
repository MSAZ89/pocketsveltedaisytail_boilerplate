<script>
	import { auth } from '$lib/pocketbase.svelte';
	import Themecontroller from './themecontroller.svelte';
	let isMenuOpen = $state(false);
</script>

<nav class="bg-primray border-primary border-b shadow-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="flex-shrink-0" aria-label="Home">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						class="stroke-primary"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg
					>
				</a>
			</div>
			<div class="flex items-center md:hidden">
				<button
					class="swap swap-rotate cursor-pointer"
					onclick={() => (isMenuOpen = !isMenuOpen)}
					aria-label="Toggle menu"
				>
					<svg
						class="h-6 w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
			<div class="hidden md:flex md:items-center md:space-x-4">
				{#if !auth.isAuthenticated}
					<a
						href="/login"
						class="text-base-content hover:bg-primary/75 hover:text-primary-content rounded-md px-3 py-2 text-sm font-medium"
						aria-label="Login"
					>
						Login
					</a>
					<a
						href="/register"
						class="text-base-content hover:bg-primary/75 hover:text-primary-content rounded-md px-3 py-2 text-sm font-medium"
						aria-label="Register"
					>
						Register
					</a>
				{/if}
				{#if auth.isAuthenticated}
					<a
						href="/dashboard"
						class="text-base-content hover:bg-primary/75 hover:text-primary-content rounded-md px-3 py-2 text-sm font-medium"
						aria-label="Dashboard"
					>
						Dashboard
					</a>
				{/if}
				<Themecontroller />
			</div>
		</div>
	</div>
	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden">
			<div class="mx-auto space-y-1 px-2 pb-3 pt-2 text-center sm:px-3">
				{#if !auth.isAuthenticated}
					<a
						href="/login"
						class="text-base-content hover:bg-primary/75 hover:text-primary-content rounded-md px-3 py-2 text-sm font-medium"
						aria-label="Login"
					>
						Login
					</a>
					<a
						href="/register"
						class="text-base-content hover:bg-primary/75 hover:text-primary-content rounded-md px-3 py-2 text-sm font-medium"
						aria-label="Register"
					>
						Register
					</a>
				{/if}
				{#if auth.isAuthenticated}
					<a
						href="/dashboard"
						class="text-base-content hover:bg-primary/75 hover:text-primary-content rounded-md px-3 py-2 text-sm font-medium"
						aria-label="Dashboard"
					>
						Dashboard
					</a>
				{/if}
				<Themecontroller />
			</div>
		</div>
	{/if}
</nav>
