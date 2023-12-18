<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	export let data;

	const { form, errors, constraints, enhance, message } = superForm(data.signUpForm);
</script>

<div class="min-h-screen flex items-center justify-center flex-col lg:flex-row">
	<!-- Logo and Welcome Section (Left side) -->
	<div class="flex flex-col items-center space-y-4 m-5 lg:m-10">
		<img src="/logo.svg" alt="Logo" class="w-20 md:w-40" />
		<img src="/RPJooJ.svg" alt="RPJooJ" class="h-10 md:h-20" />
		<h1 class="text-on-primary font-heading text-2xl font-semibold hidden lg:block">Bem-vindo!</h1>
	</div>

	<!-- Registration Form (Right side) -->
	<form
		method="POST"
		action="?/signUp"
		class="w-full md:m-20 md:w-3/4 lg:w-1/2 xl:max-w-xl p-8 variant-soft-primary rounded-lg shadow-lg space-y-8"
		use:enhance
	>
		<h2 class="text-on-primary font-heading text-4xl font-bold mb-8">Criar Conta</h2>
		{#if $message}fail
			<div class="text-green-500">{$message}</div>
		{/if}
		<div class="flex-grow flex flex-col space-y-6">
			<label class="block">
				<input
					class="form-input input block w-full"
					name="email"
					type="email"
					placeholder="Email"
					bind:value={$form.email}
					{...$constraints.email}
				/>
				{#if $errors?.email}
					<span class="text-error-300">{$errors?.email?.join(', ')}</span>
				{/if}
			</label>
			<label class="block">
				<input
					class="form-input input block w-full"
					name="password"
					type="password"
					placeholder="Senha"
					bind:value={$form.password}
					{...$constraints.password}
				/>
				{#if $errors.password}
					<span class="text-error-300">{$errors.password?.join(', ')}</span>
				{/if}
			</label>
			<button
				class="text-on-primary font-base w-full px-12 py-2 bg-primary-500 rounded-lg shadow-md"
			>
				Registrar
			</button>
		</div>
	</form>
</div>
