<script lang="ts">
	import {
		AppRail,
		AppRailAnchor,
		Avatar,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import TableLink from '$lib/components/App/TableLink.svelte';

	import { getModalStore } from '@skeletonlabs/skeleton';
	import CreateTableModal from '../Table/CreateTableModal.svelte';
	import Icon from '@iconify/svelte';
	import { type Guild } from '../../models/guild';

	const modalStore = getModalStore();

	export let data;
	const modalComponent: ModalComponent = {
		ref: CreateTableModal,
		props: { data }
	};

	const modal: ModalSettings = {
		type: 'component',
		component: modalComponent
	};
	export let tables: Guild[];
</script>

<AppRail active="bg-none" hover="bg-none" gap="p-2 space-y-2">
	<slot name="lead">
		<AppRailAnchor href="/home" selected={$page.url.pathname === '/home'}>
			<Avatar src="/logo.svg" rounded="rounded-none" background="bg-none" />
		</AppRailAnchor>
	</slot>

	<hr class="!border-t-4 !border-primary-700 rounded-2xl m-2" />
	<div class="flex flex-col space-y-3 mb-2 align-middle justify-center items-center">
		{#each tables as table}
			<TableLink {table} />
		{/each}
		<button
			class="flex align-middle justify-center btn-icon"
			on:click={() => modalStore.trigger(modal)}
		>
			<Icon icon="material-symbols:add-circle-outline-rounded" width="40" height="40" />
		</button>
		<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
			<div><p>Demo Content</p></div>
			<div class="arrow bg-surface-100-800-token" />
		</div>
	</div>

	<slot name="trail" />

	<svelte:fragment slot="trail">
		<AppRailAnchor href="/auth/sign-up" selected={$page.url.pathname === '/auth/sign-up'}
			>Sign Up</AppRailAnchor
		>
		<AppRailAnchor href="/auth/sign-in" selected={$page.url.pathname === '/auth/sign-in'}
			>Sign In</AppRailAnchor
		>
		<form method="POST">
			<button formaction="/auth/account?/logout"> Logout </button>
		</form>
	</svelte:fragment>
</AppRail>

<style>
</style>
