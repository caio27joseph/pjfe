import { fetchGuildById } from '../../../lib/use_cases/fetch_guild_by_id.js';
import { fetchGuildResources } from '../../../lib/use_cases/fetch_guild_resources.js';

export async function load(event) {
	const tableId = event.params.tableId;
	if (!tableId) {
		return {
			status: 400,
			error: new Error('Table ID is required')
		};
	}
	const table = fetchGuildById(event, tableId);
	const resources = fetchGuildResources(event, tableId);
	return {
		table,
		resources
	};
}
