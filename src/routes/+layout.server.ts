import UserProvider from '$lib/providers/user';

export async function load(event) {
	const provider = new UserProvider(event);

	const myTables = await provider.fetchOwnTables();

	return {
		myTables
	};
}
