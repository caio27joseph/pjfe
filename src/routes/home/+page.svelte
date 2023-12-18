<script lang="ts">
	import TableCard from '$lib/components/Table/TableCard.svelte';
	import Icon from '@iconify/svelte';

	export let data;

	// First Table
	const bestTable = data.myTables[0];
	let tables = data.myTables;
</script>

{#if bestTable}
	<!-- content here -->
	<div
		class="container h-[80vh] bg-center bg-cover w-full max-w-full flex flex-col justify-evenly"
		style="background-image: url({bestTable?.imageUrl ?? '/images/table_placeholder.jpg'});"
	>
		<a class="cols grid grid-cols-2" href="/tables/{bestTable.id}">
			<div class="grow table-info p-8 text-white variant-glass-surface rounded-sm max-w-0.5">
				<h2 class="text-3xl font-bold mb-4">{bestTable.title}</h2>
				<p>
					Aliquip consectetur irure anim laborum officia ea ut sunt excepteur ad consectetur
					eiusmod. Nostrud occaecat occaecat consectetur incididunt ipsum occaecat est. Exercitation
					elit excepteur aliquip ullamco laboris sunt ut pariatur aliquip. Consectetur tempor
					occaecat magna quis est pariatur. Consequat do consequat ipsum laborum qui nisi ipsum ex
					Lorem ipsum ea. Qui occaecat duis adipisicing voluptate nisi sunt esse commodo adipisicing
					id voluptate irure deserunt ut.
				</p>
				<div class="rating p-10 flex justify-end">
					<Icon icon="material-symbols:star-rate-rounded" width="40" height="40" />
					<Icon icon="material-symbols:star-rate-rounded" width="40" height="40" />
					<Icon icon="material-symbols:star-rate-rounded" width="40" height="40" />
					<Icon icon="material-symbols:star-rate-rounded" width="40" height="40" />
					<Icon icon="material-symbols:star-half-rounded" width="40" height="40" />
				</div>
			</div>
		</a>
	</div>
{/if}
<div class="feed flex flex-col space-y-8 -translate-y-44 md:-translate-y-12 lg:-translate-y-32">
	{#each [1, 2, 3] as _}
		<!-- This loop is just a placeholder to generate 3 rows. -->
		<div class="w-full max-w-full h-48">
			<h2 class="text-2xl font-bold mb-4">Recomendados</h2>
			<ul class="flex flex-row space-x-4 overflow-x-scroll pb-5 h-full">
				{#each tables as table}
					<li class="w-64 shrink-0">
						<TableCard id={table.id.toString()} title={table.title} img={table.imageUrl} />
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
	.container {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		-webkit-mask-image: linear-gradient(to bottom, black, black 50%, transparent 90%);
		mask-image: linear-gradient(to bottom, black, black 50%, transparent 90%);
	}
</style>
