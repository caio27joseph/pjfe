<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import TableLeftBar from './TableLeftBar.svelte';

	export let data;
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		{#if data.table}
			<TableLeftBar table={data.table} resources={data.resources} />
		{/if}
	</svelte:fragment>

	<div
		class="container grid grid-rows-[auto,1fr] py-8 px-6 max-h-screen overflow-hidden min-w-full h-full"
	>
		<!-- <Navbar tabs={$tabs} /> -->
		<div class="content-area grid grid-cols-[1fr,auto,300px] gap-4 items-start overflow-hidden">
			<slot />

			<div
				class="divider w-0.5 bg-gradient-to-b from-transparent via-gray-500 to-transparent self-stretch"
			/>
			<!-- <Inspector /> -->
		</div>
	</div>
</AppShell>
