import { graphql } from '$houdini';
import type { ServerLoadEvent } from '@sveltejs/kit';

export class TableProvider {
	constructor(private readonly event: ServerLoadEvent) {}

	async fetchTable(id: string) {
		const store = graphql(`
			query TableInfo($id: ID!) {
				findTable(where: { id: $id }) {
					id
					title
					imageUrl
				}
				tableLibraries(where: { tableId: $id }) {
					id
					name
					icon
					root {
						id
						name
						parentId
					}
					articles {
						id
						name
						parentId
					}
				}
			}
		`);
		const res = await store.fetch({
			event: this.event,
			variables: {
				id
			}
		});
		return res;
	}
}
