import { fetchMyGuilds } from '../lib/use_cases/fetch_my_guilds.js';

export async function load(event) {
	const accessToken = event.cookies.get('access_token');
	if (!accessToken) {
		return {
			myTables: [],
			authenticated: false
		};
	}
	const myTables = await fetchMyGuilds(event);
	return {
		myTables,
		authenticated: true
	};
}
6;
