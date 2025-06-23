import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { API_ENDPOINT } from '$env/static/private';
import { Resource } from '../models/resource';

/**
 * Fetches all resources for a specific guild.
 * This function should be called in a `load` function of a server-side SvelteKit page (`+page.server.ts`).
 *
 * @param {RequestEvent} event - The SvelteKit request event object.
 * @param {string} guildId - The ID of the guild for which to fetch resources.
 * @returns {Promise<Resource[]>} A promise that resolves to an array of resources.
 * @throws {Error} Throws an error if the request fails, the user is not authenticated, or the guildId is invalid.
 */
export const fetchGuildResources = async (
	event: RequestEvent,
	guildId: string
): Promise<Resource[]> => {
	const accessToken = event.cookies.get('access_token');

	if (!accessToken) {
		throw error(401, 'Usuário não autenticado. Faça o login para continuar.');
	}

	if (!guildId) {
		throw error(400, 'ID da guilda não fornecido.');
	}

	try {
		// Construct the correct URL for the nested resource route
		const url = `${API_ENDPOINT}/guilds/${guildId}/resources`;

		const response = await event.fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw error(401, 'Sua sessão expirou. Por favor, faça o login novamente.');
			}
			if (response.status === 404) {
				throw error(404, 'Guilda não encontrada.');
			}
			throw error(response.status, `Erro ao buscar os recursos: ${response.statusText}`);
		}

		const resources: Resource[] = await response.json();
		return resources;
	} catch (err) {
		// Log the original error for debugging purposes
		console.error('Falha na função fetchGuildResources:', err);

		// Re-throw specific SvelteKit errors or a generic one
		if (err && typeof err === 'object' && 'status' in err) {
			throw err; // Re-throw SvelteKit's error object
		}

		throw error(500, 'Não foi possível conectar ao servidor para buscar os recursos.');
	}
};
