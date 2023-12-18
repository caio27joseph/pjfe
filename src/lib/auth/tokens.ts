import type { Cookies } from '@sveltejs/kit';

export const setAuthToken = (
	cookies: Cookies,
	{
		access_token,
		refresh_token
	}: {
		access_token: string;
		refresh_token: string;
	}
) => {
	cookies.set('access_token', access_token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 1 week
		httpOnly: true,
		sameSite: 'lax'
	});
	cookies.set('refresh_token', refresh_token, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7, // 1 week
		httpOnly: true,
		sameSite: 'lax'
	});
};

export const getAuthToken = (cookies: Cookies) => {
	const access_token = cookies.get('access_token');
	const refresh_token = cookies.get('refresh_token');

	return { access_token, refresh_token };
};

export const deleteAuthToken = (cookies: Cookies) => {
	cookies.delete('access_token', {
		path: '/'
	});
	cookies.delete('refresh_token', {
		path: '/'
	});
};
