<script lang="ts">
	import { page } from '$app/stores';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import TableLeftBar from './TableLeftBar.svelte';
	import { writable } from 'svelte/store';
	import Library from '$lib/components/TableLibrary/Library.svelte';
	import { Guild } from '../../../lib/models/guild';
	import { Resource } from '../../../lib/models/resource';
	import { ILibrary } from '../../../lib/components/TableLibrary/types';

	export let table: Guild;
	export let resources: Resource[];
	const libraries: ILibrary[] = [
		{
			id: '1',
			name: 'Recursos',
			root: resources.map((resource) => ({
				id: resource._id,
				name: resource.title,
				articles: resource.documents?.map((document) => ({
					id: document._id,
					name: document.title
				}))
			}))
		}
	];
	let selectedLibraryId = writable<string | undefined>(libraries?.[0]?.id);

	const tableLeftBarRoutes = ['/tables/[tableId]', '/tables/[tableId]/articles/[articleId]'];
</script>

<div class="container h-screen w-[300px] overflow-auto bg-surface-600">
	{#if tableLeftBarRoutes.includes($page.route.id ?? '')}
		<div>
			<a
				class="table-info flex font-bold py-0 !h-44"
				href="/tables/{table._id}/menu"
				style="background-image: url({table?.imageUrl || '/images/table_placeholder.jpg'});"
			>
				<h1 class="text-2xl text-primary-100 p-3 pt-10 w-full bg-gradient-to-t from-black">
					{table.name}
				</h1>
			</a>
			<div class="library-hub pt-6 pb-2 px-2">
				<h1 class="text-primary-500 px-4 text-base">Bibliotecas</h1>
				<div class="hub-options pt-4">
					<ListBox>
						{#each libraries as library, i (library.id)}
							<ListBoxItem
								padding="0"
								bind:group={$selectedLibraryId}
								name={library.name}
								value={library.id}
								active="bg-surface-900"
							>
								<div class="flex px-4 py-2 items-center">
									<!-- <Icon
										icon="material-symbols:menu-book-outline-rounded"
										width="20"
										height="28"
										class="text-tertiary-500"
									/> -->
									<h2 class="ml-1 text-base">{library.name}</h2>
								</div>
							</ListBoxItem>
						{/each}
					</ListBox>
				</div>
			</div>
			{#each libraries as library}
				<Library {table} {library} hidden={library.id !== $selectedLibraryId} />
			{/each}
		</div>
	{:else if $page.route.id === '/tables/[tableId]/menu'}
		<!-- <TableMenuBar /> -->
	{:else}
		...
	{/if}
</div>

<style>
	.table-info {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		position: relative;
		align-items: end;
	}
	.library-hub {
		border-bottom: 0.1px solid #ffffff40;
	}
</style>
