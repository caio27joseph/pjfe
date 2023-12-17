<script lang="ts">
	import { getInitials, isUrl } from '$lib/utils';
	import { Avatar, getModalStore } from '@skeletonlabs/skeleton';
	import TableCard from './TableCard.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { applyAction, enhance } from '$app/forms';
	import type { CreateTableForm } from '$lib/providers/table';

	export let data: {
		createTableForm: CreateTableForm;
	};
	const modalStore = getModalStore();

	const { form, errors, constraints } = superForm(data.createTableForm);
</script>

<div class="card card-hover p-4 bg-surface-500">
	<header class="card-header">
		<h1 class="text-2xl font-bold text-secondary-400">Criar Mesa</h1>
		<span>Crie uma nova mesa para jogar com seus amigos</span>
		<div class="preview p-4 flex flex-col space-y-3 justify-center items-center">
			<Avatar
				src={$form.imageUrl ??
					(getInitials($form.title ?? '') ? undefined : '/images/table_placeholder.jpg')}
				initials={getInitials($form.title ?? '') ?? 'JooJ'}
			/>
			<div class="w-80 h-48">
				<TableCard title={$form.title ?? ''} img={$form.imageUrl} />
			</div>
		</div>
	</header>
	<section class="p-4">
		<form
			class="m-8"
			method="POST"
			action="/tables?/createTable"
			use:enhance={() => {
				return ({ result }) => {
					if (result.type === 'redirect') {
						modalStore.close();
						return applyAction(result);
					}
				};
			}}
		>
			<div class="flex-grow flex flex-col space-y-6">
				<label class="block">
					<input
						name="title"
						bind:value={$form.title}
						class="form-input input block w-full"
						type="text"
						placeholder="Table Title"
						{...$constraints.title}
					/>
					{#if $errors?.title}
						<span class="text-error-300">{$errors?.title}</span>
					{/if}
				</label>
				<label class="block">
					<input
						name="imageUrl"
						bind:value={$form.imageUrl}
						class="form-input input block w-full"
						type="url"
						placeholder="Table image Url"
						{...$constraints.imageUrl}
					/>
					{#if $errors?.imageUrl}
						<span class="text-error-300">{$errors?.imageUrl}</span>
					{/if}
				</label>
			</div>
			<div class="actions p-6">
				<button type="submit" class="w-full rounded-lg shadow-md variant-ghost-success p-2">
					Create
				</button>
			</div>
		</form>
	</section>
</div>

<style>
</style>
