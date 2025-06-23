import type { RequestEvent } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode'; // <-- NOVO: Importa a biblioteca
import { Guild } from '../models/guild';
import { API_ENDPOINT } from '$env/static/private';

// Definindo a interface para o payload do JWT.
// O ID do usuário geralmente está no campo 'sub'. Verifique seu backend se for diferente.
interface JwtPayload {
	sub: string; // Subject (user ID)
	email: string;
	iat?: number; // Issued at
	exp?: number; // Expiration time
}
/**
 * Busca as guildas do usuário autenticado.
 * Esta função deve ser chamada em um `load` de uma página de servidor (`+page.server.ts`).
 *
 * @param {RequestEvent} event - O objeto de evento da requisição do SvelteKit.
 * @returns {Promise<Guild[]>} Uma promessa que resolve para um array de guildas.
 * @throws {Error} Lança um erro se a requisição falhar ou o usuário não estiver autenticado.
 */
export const fetchMyGuilds = async (event: RequestEvent): Promise<Guild[]> => {
	const accessToken = event.cookies.get('access_token');

	if (!accessToken) {
		throw error(401, 'Usuário não autenticado. Faça o login para continuar.');
	}

	try {
		// NOVO PASSO: Decodificar o JWT para obter o ID do usuário
		const decodedToken = jwtDecode<JwtPayload>(accessToken);
		const userId = decodedToken.sub;

		if (!userId) {
			throw error(400, 'Token de acesso inválido ou ID do usuário não encontrado.');
		}

		// ROTA ATUALIZADA: Usa o ID do usuário para construir a URL correta
		const url = `${API_ENDPOINT}/users/${userId}/guilds`;
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
			throw error(response.status, `Erro ao buscar as guildas: ${response.statusText}`);
		}

		const guilds: Guild[] = await response.json();
		return guilds;
	} catch (err) {
		console.error('Falha na função fetchMyGuilds:', err);
		if (
			typeof err === 'object' &&
			err !== null &&
			'name' in err &&
			(err as { name?: string }).name === 'InvalidTokenError'
		) {
			throw error(401, 'Token de sessão inválido.');
		}
		throw error(500, 'Não foi possível conectar ao servidor para buscar suas guildas.');
	}
};
