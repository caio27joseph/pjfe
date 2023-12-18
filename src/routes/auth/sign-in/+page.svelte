<script lang="ts">
	import { goto } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms/client';
	import { writable } from 'svelte/store';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data;

	const { form, errors, constraints, enhance } = superForm(data.signInForm);
</script>

<div class="min-h-screen flex items-center justify-center flex-col lg:flex-row">
	<div class="flex flex-col items-center space-y-4 m-5 lg:m-10">
		<img src="/logo.svg" alt="Logo" class="w-20 md:w-40" />
		<img src="/RPJooJ.svg" alt="RPJooJ" class="h-10 md:h-20" />
		<h1 class="text-on-primary font-heading text-2xl font-semibold hidden lg:block">Boas Vindas</h1>
	</div>
	<form
		method="POST"
		action="?/signIn"
		class="w-full md:m-20 md:w-3/4 lg:w-1/2 xl:max-w-xl p-8 variant-soft-primary rounded-lg shadow-lg space-y-8"
		use:enhance
	>
		<h2 class="text-on-primary font-heading text-4xl font-bold mb-8">Sign In</h2>

		<div class="flex-grow flex flex-col space-y-6">
			<label class="block">
				<input
					name="email"
					class="form-input input block w-full"
					type="email"
					placeholder="Email"
					bind:value={$form.email}
					{...$constraints.email}
				/>
				{#if $errors?.email}
					<span class="text-error-300">{$errors?.email}</span>
				{/if}
			</label>
			<label class="block">
				<input
					id="password"
					name="password"
					class="form-input input block w-full {$errors.password ? 'input-error' : ''}"
					type="password"
					placeholder="Password"
					bind:value={$form.password}
					{...$constraints.password}
				/>
				{#if $errors.password}
					<span class="text-error-300">{$errors.password}</span>
				{/if}
			</label>

			<!-- <a href="#" class="text-tertiary-300 font-base">Forgot your password?</a> -->

			<div class="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-2">
				<button class="btn variant-filled-primary w-full sm:w-1/2 px-12 py-2 rounded-lg shadow-md">
					Sign In
				</button>
				<button
					class="btn variant-filled-secondary w-full sm:w-1/2 px-12 py-2 bg-tertiary-700 rounded-lg shadow-md"
					on:click|preventDefault={() => goto('/auth/sign-up')}
				>
					Create Account
				</button>
			</div>

			<div class="flex flex-row justify-center items-center space-x-4 sm:hidden">
				<!-- <button class="w-12 h-12 bg-primary-700 rounded-full">
					<img src="/path-to-google-icon.svg" alt="Google" class="w-6 h-6" />
				</button>
				<button class="w-12 h-12 bg-primary-700 rounded-full">
					<img src="/path-to-microsoft-icon.svg" alt="Microsoft" class="w-6 h-6" />
				</button>
				<button class="w-12 h-12 bg-primary-700 rounded-full">
					<img src="/path-to-github-icon.svg" alt="Github" class="w-6 h-6" />
				</button> -->
			</div>
		</div>
	</form>
</div>
