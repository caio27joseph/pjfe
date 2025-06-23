<script lang="ts">
	import { page } from '$app/stores';
	import type { TableInfo$result } from '$houdini';
	import { getInitials } from '$lib/utils';
	import { AppRailAnchor, Avatar } from '@skeletonlabs/skeleton';
	import { Guild } from '../../models/guild';

	export let table: Guild;
	const path = table._id ? `/tables/${table._id}` : '/';
	$: selected = $page.url.pathname === path;
</script>

{#if table?._id && table._id !== 'null'}
	<!-- content here -->
	<AppRailAnchor href={path} {selected}>
		<Avatar
			src={table?.imageUrl ?? ''}
			initials={getInitials(table.name)}
			rounded="hover:rounded-2xl {selected ? 'rounded-2xl' : 'rounded-full'}"
		/>
	</AppRailAnchor>
{/if}
