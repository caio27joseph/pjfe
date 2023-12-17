import { createTableSchema, type CreateTableForm } from '$lib/providers/table.js';
import UserProvider from '$lib/providers/user';
import { superValidate } from 'sveltekit-superforms/client';

export async function load(event) {
	const provider = new UserProvider(event);

	const myTables = await provider.fetchOwnTables();

	const createTableForm: CreateTableForm = await superValidate(createTableSchema);

	return {
		myTables,
		createTableForm
	};
}
