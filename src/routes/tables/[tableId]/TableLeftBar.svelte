<script lang="ts">
	import { page } from '$app/stores';
	import { groupBy } from 'lodash-es';
	import Icon from '@iconify/svelte';

	import type { Guild } from '../../../lib/models/guild';
	import { type Resource, ResourceType } from '../../../lib/models/resource';
	import { writable } from 'svelte/store';

	export let table: Guild;
	export let resources: Resource[];

	const resourcesByType = groupBy(resources, 'type');
	const defaultTypes = ['undefined', 'null', 'documentation'];
	const defaultResources = defaultTypes.flatMap((type) => resourcesByType[type] ?? []);

	const libraries: {
		id: string;
		name: string;
		resources: {
			id: string;
			name: string;
			documents: {
				id: string;
				name: string;
			}[];
		}[];
	}[] = [
		{
			id: '1',
			name: 'Recursos',
			resources: defaultResources.map((resource) => ({
				id: resource._id,
				name: resource.title,
				documents:
					resource.documents?.map((document) => ({
						id: document._id,
						name: document.title
					})) ?? []
			}))
		},
		{
			id: '2',
			name: 'Ficha',
			resources: resourcesByType[ResourceType.FIELD]?.map((resource) => ({
				id: resource._id,
				name: resource.title,
				documents:
					resource.documents?.map((document) => ({
						id: document._id,
						name: document.title
					})) ?? []
			}))
		}
	];

	let selectedLibraryId = libraries?.[0]?.id;

	const tableLeftBarRoutes = ['/tables/[tableId]', '/tables/[tableId]/articles/[articleId]'];

	$: isLeftBarVisible = tableLeftBarRoutes.includes($page.route.id ?? '');

	const openResources = writable<Record<string, boolean>>({});

	function toggleResource(id: string) {
		openResources.update((current) => {
			return {
				...current,
				[id]: !current[id]
			};
		});
	}

	function createDocumentPopup() {
		// TODO
	}
</script>

<div class="container h-screen w-[300px] overflow-auto bg-surface-600">
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
							on:click={() => (selectedLibraryId = library.id)}
							class="hub-button flex px-4 py-2 items-center rounded-md text-left"
							class:active={selectedLibraryId === library.id}
						>
							<Icon
								icon="material-symbols:menu-book-outline-rounded"
								width="20"
								height="28"
								class="text-tertiary-500"
							/>
							<h2 class="ml-1 text-base">{library.name}</h2>
						</button>
					{/each}
				</div>
			</div>
			{#each libraries as library (library.id)}
				{#if library.id === selectedLibraryId}
					{#each library.resources as resource}
						<div class="grid grid-cols-[1fr_auto]">
							<button
								on:click={() => toggleResource(resource.id)}
								class="flex px-2 py-2 items-center rounded-md text-left gap-2"
							>
								<Icon
									icon="material-symbols:arrow-forward-ios-rounded"
									width="15"
									height="21"
									style={$openResources[resource.id] ? 'transform: rotate(90deg);' : ''}
								/>
								{resource.name}
							</button>
							<div class="actions flex items-center gap-2 pr-1">
								<!-- #region Add Document -->
								<button type="button" class="p-1 rounded-full hover:bg-gray-700">
									<Icon icon="material-symbols:add-2-rounded" width="16" height="16" />
								</button>
							</div>
						</div>
						{#if $openResources[resource.id]}
							<div class="pl-8">
								{#each resource.documents as document}
									<a
										href={`/tables/${table._id}/articles/${document.id}`}
										class="flex py-1 items-center gap-2">-- {document.name}</a
									>
								{/each}
							</div>
						{/if}
					{/each}
				{/if}
			{/each}
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
