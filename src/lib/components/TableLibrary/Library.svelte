<script lang="ts">
	// import type { TableInfo$result } from '$houdini';
	// import Icon from '@iconify/svelte';
	import DirActions from './DirActions.svelte';
	import Directory from './Directory.svelte';
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
	import { groupBy } from 'lodash-es';

	// import { NavBarController, activeTab } from '$lib/table/NavBarController';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Dir, IArticle, ILibrary } from './types';
	import { Guild } from '../../models/guild';

	export let table: Guild;
	export let library: ILibrary;

	// export let table: TableInfo$result['findTable'];
	// export let library: TableInfo$result['tableLibraries'][1];
	export let hidden: boolean = false;

	const makeRoot = (library: ILibrary) => {
		const dirByParent = groupBy(library.root ?? [], 'parentId');

		const makeTree = (
			dir: Dir | { id: string; name: string; parentId: string; directories?: Dir[] }
		) => {
			dir.directories = dirByParent[dir.id] || [];
			for (const child of dir.directories || []) {
				makeTree(child);
			}
		};
		const rootDirs = dirByParent?.['null'] ?? dirByParent?.['undefined'] ?? [];
		for (const dir of rootDirs) {
			makeTree(dir);
		}
		return rootDirs as Dir[];
	};

	$: dirs = makeRoot(library);
</script>

<div class="container p-2 pt-0 {hidden ? 'hidden' : ''}">
	<div class="actions flex items-center justify-between pt-2 px-4">
		<h1 class="text-sm text-gray-300">{library.name}</h1>
		<DirActions {table} {library} />
	</div>
	<TreeView padding="p-0">
		{#each dirs as directory}
			<Directory {table} {directory} {library} />
		{/each}
		{#each library.articles?.filter((a) => !a.parentId) || [] as article}
			<TreeViewItem
				><svelte:fragment slot="lead">
					<!-- <Icon
						icon="material-symbols:article-outline-rounded"
						width="20"
						height="28"
						class="text-tertiary-500"
					/> -->
				</svelte:fragment>
				<button
					on:click={() => {
						// NavBarController.openTab({
						// 	id: article.id,
						// 	icon: 'material-symbols:article-outline-rounded',
						// 	name: article.name
						// });
						// goto(`/tables/${table.id}/articles/${article.id}?` + $page.url.searchParams, {
						// 	replaceState: false,
						// 	noScroll: true
						// });
					}}
					disabled
				>
					{article.name}
				</button>
			</TreeViewItem>
		{/each}
	</TreeView>
</div>
