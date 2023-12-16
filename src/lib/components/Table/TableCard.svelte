<script lang="ts">
	export let id: string | undefined = undefined;
	export let title: string;
	export let img: string | null;
</script>

<a
	class="table-card card card-hover bg-none block h-full rounded-lg overflow-hidden"
	href={id ? `/tables/${id}` : '#'}
>
	<div
		class="table-info flex font-bold py-0 h-full"
		style="background-image: url({img ?? '/images/table_placeholder.jpg'});"
	>
		<h1 class="text-2xl text-primary-100 p-3 pt-10 w-full bg-gradient-to-t from-black">
			{title}
		</h1>
	</div>
</a>

<style>
	.table-info {
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		position: relative;
		align-items: end;
	}
</style>
