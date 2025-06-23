import { API_ENDPOINT } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { Guild } from '../models/guild';

/**
 * Busca uma guilda específica pelo seu ID.
 * A requisição é autenticada, garantindo que o usuário tenha permissão para ver a guilda (lógica a ser implementada no backend).
 *
 * @param {RequestEvent} event - O objeto de evento da requisição do SvelteKit.
 * @param {string} guildId - O ID da guilda a ser buscada.
 * @returns {Promise<Guild>} Uma promessa que resolve para o objeto da guilda.
 * @throws {Error} Lança um erro se a guilda não for encontrada ou se o usuário não estiver autenticado.
 */
export const fetchGuildById = async (event: RequestEvent, guildId: string): Promise<Guild> => {
	// 1. Pega o token de acesso dos cookies para autenticar a requisição.
	const accessToken = event.cookies.get('access_token');

	if (!accessToken) {
		throw error(401, 'Usuário não autenticado. Faça o login para continuar.');
	}

	// Validação básica para garantir que um ID foi fornecido
	if (!guildId) {
		throw error(400, 'O ID da guilda não foi fornecido.');
	}

	try {
		// 2. Monta a URL para o endpoint específico da guilda
		const url = `${API_ENDPOINT}/guilds/${guildId}`;
		console.log(`Buscando dados da guilda em: ${url}`); // Log para depuração

		const response = await event.fetch(url, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json'
			}
		});

		// 3. Trata as respostas da API
		if (!response.ok) {
			if (response.status === 401) {
				throw error(401, 'Sua sessão expirou ou você não tem permissão para ver esta guilda.');
			}
			if (response.status === 404) {
				throw error(404, 'A guilda com o ID fornecido não foi encontrada.');
			}
			// Para outros erros (ex: 500), lança um erro genérico.
			throw error(response.status, `Erro ao buscar a guilda: ${response.statusText}`);
		}

		// 4. Retorna os dados da guilda em formato JSON
		const guild: Guild = await response.json();
		return guild;
	} catch (err) {
		console.error(`Falha na função fetchGuildById para o ID ${guildId}:`, err);

		// Se o erro já é um erro do SvelteKit, apenas o relança.
		if (typeof err === 'object' && err !== null && 'status' in err) {
			throw err;
		}

		// Para erros de rede ou outros problemas inesperados
		throw error(500, 'Não foi possível conectar ao servidor para buscar a guilda.');
	}
};
