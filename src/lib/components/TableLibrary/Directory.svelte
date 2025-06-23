<script lang="ts">
	import { TreeViewItem } from '@skeletonlabs/skeleton';
	import { selectedDirectories } from './store';
	// import Icon from '@iconify/svelte';
	import DirActions from './DirActions.svelte';
	import type { Dir, IArticle } from './types';
	import { Guild } from '../../models/guild';
	// import type { TableInfo$result } from '$houdini';
	// import type { Dir } from '$lib/types';

	type Library = {
		id: string;
		name: string;
		root?: Dir[];
		articles?: IArticle[];
	};

	// export let table: TableInfo$result['findTable'];
	// export let library: TableInfo$result['tableLibraries'][0];

	// export let directory: Dir;
	export let editMode: boolean = true;
	export let table: Guild;
	export let library: Library;
	export let directory: Dir;

	$: directories = directory?.directories || [];
	$: articles = directory?.articles || [];
	let hover = '';
</script>

<TreeViewItem
	padding="p-2"
	regionSummary="item [&>.tree-item-content]:w-full [summary:hover .hide-button]:inline-block"
	name={directory.id}
	value={directory.id}
	bind:group={$selectedDirectories}
>
	<span class="item flex justify-between grow min-w-full">
		{directory.name}
		{#if editMode}
			<div class="hide-button">
				<DirActions {table} {directory} {library} />
			</div>
		{/if}
	</span>
	<svelte:fragment slot="children">
		{#each directories as directory}
			<svelte:self {directory} {table} {library} />
		{/each}
		{#each articles as article}
			<TreeViewItem>{article.name}</TreeViewItem>
		{/each}
	</svelte:fragment>
</TreeViewItem>

<style>
	.hide-button {
		display: none;
	}
	.item:hover .hide-button {
		display: inline-block;
	}
</style>
