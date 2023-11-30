<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	// import type { TableInfo$result } from '$houdini';
	// import Icon from '@iconify/svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	// import CreateArticleModal from '../CreateArticleModal.svelte';
	export let table = {};
	export let directory:
		| {
				name: string;
				id: string;
		  }
		| undefined = undefined;
	export let library:
		| {
				name: string;
				id: string;
		  }
		| undefined;

	const modalStore = getModalStore();

	// const modalComponent: ModalComponent = {
	// 	ref: CreateArticleModal,
	// 	props: { table, directory, library }
	// };

	// const modal: ModalSettings = {
	// 	type: 'component',
	// 	component: modalComponent
	// };
</script>

<button name="parentId" class="flex items-center justify-center hide-button">
	<!-- on:click={() => modalStore.trigger(modal)} -->
	<!-- <Icon
		icon="material-symbols:add-circle-outline-rounded"
		width="20"
		height="24"
		class="text-tertiary-400 hover:text-tertiary-600"
	/> -->
</button>
