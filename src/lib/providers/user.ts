import { graphql } from '$houdini';
import type { ServerLoadEvent } from '@sveltejs/kit';

class UserProvider {
	constructor(private readonly event: ServerLoadEvent) {}

	async fetchOwnTables() {
		const store = graphql(`
			query MyTables {
				myTables {
					id
					title
					imageUrl
				}
			}
		`);
		const res = await store.fetch({
			event: this.event
		});

		const data = res.data;

		return data?.myTables ?? [];
	}
}

export default UserProvider;
