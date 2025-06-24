<script lang="ts">
	import { page } from '$app/stores';
	import { groupBy } from 'lodash-es';
	import Icon from '@iconify/svelte';

	import Library from '$lib/components/TableLibrary/Library.svelte';
	import type { ILibrary } from '../../../lib/components/TableLibrary/types';
	import type { Guild } from '../../../lib/models/guild';
	import { Resource, ResourceType } from '../../../lib/models/resource';

	export let table: Guild;
	export let resources: Resource[];

	const resourcesByType = groupBy(resources, 'type');
	const defaultTypes = ['undefined', 'null', 'documentation'];
	const defaultResources = defaultTypes.flatMap((type) => resourcesByType[type] ?? []);

	const libraries: ILibrary[] = [
		{
			id: '1',
			name: 'Recursos',
			root: defaultResources.map((resource) => ({
				id: resource._id,
				name: resource.title,
				parentId: '1',
				articles: resource.documents?.map((document) => ({
					id: document._id,
					name: document.title
				}))
			}))
		},
		{
			id: '2',
			name: 'Ficha',
			root:
				resourcesByType[ResourceType.FIELD]?.map((resource) => ({
					id: resource._id,
					name: resource.title,
					parentId: '2',
					articles: resource.documents?.map((document) => ({
						id: document._id,
						name: document.title
					}))
				})) ?? []
		}
	];

	let selectedLibraryId = libraries?.[0]?.id;

	const tableLeftBarRoutes = ['/tables/[tableId]', '/tables/[tableId]/articles/[articleId]'];

	$: isLeftBarVisible = tableLeftBarRoutes.includes($page.route.id ?? '');

	// --- FIX START ---
	// Create a new reactive variable that holds the entire selected library object.
	// This will automatically update whenever `selectedLibraryId` changes.
	$: selectedLibrary = libraries.find((l) => l.id === selectedLibraryId);
	// --- FIX END ---
</script>

<div class="container h-screen w-[300px] overflow-auto bg-surface-600">
	Selected ID: {selectedLibraryId}
	<br />
	Selected Name: {selectedLibrary?.name}

	{#if isLeftBarVisible}
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
				<div class="hub-options pt-4 flex flex-col space-y-1">
					{#each libraries as library (library.id)}
						<button
							type="button"
							on:click={(e) => console.log('changing', e)}
							class="hub-button flex px-4 py-2 items-center rounded-md text-left"
							class:active={selectedLibraryId === library.id}
						>
							<Icon
								icon="material-symbols:menu-book-outline-rounded"
								width="20"
								height="28"
								class="text-tertiary-500"
							/>
							<h2 class="ml-1 text-base">{library.id} {library.name}</h2>
						</button>
					{/each}
				</div>
			</div>

			{#if selectedLibrary}
				<Library {table} library={selectedLibrary} />
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Styles remain the same */
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

	.hub-button {
		transition: background-color 0.2s ease-in-out;
	}

	.hub-button:hover {
		background-color: #ffffff1a; /* Example hover effect */
	}

	.hub-button.active {
		background-color: #373737; /* Equivalent to your bg-surface-900 */
		font-weight: bold;
	}
</style>
