import { API_ENDPOINT } from '$env/static/private';
import type { RequestEvent } from '@sveltejs/kit';

export class AuthProvider {
	constructor(private readonly event: RequestEvent) {}
	// sign In should be a method using normal fetch as shold in the comments

	private setAuthToken({
		access_token,
		refresh_token
	}: {
		access_token: string;
		refresh_token: string;
	}) {
		this.event.cookies.set('access_token', access_token, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			httpOnly: true,
			sameSite: 'lax'
		});
		this.event.cookies.set('refresh_token', refresh_token, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			httpOnly: true,
			sameSite: 'lax'
		});
	}

	async signIn(email: string, password: string) {
		const response = await fetch(API_ENDPOINT + '/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		const data = await response.json();

		if (!response.ok) {
			throw Error('Invalid email or password');
		} else {
			const { access_token, refresh_token } = data;
			if (!access_token) {
				throw new Error('No access token');
			}
			this.setAuthToken({ access_token, refresh_token });
			return true;
		}
	}

	async signUp(email: string, password: string) {
		const response = await fetch(API_ENDPOINT + '/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});
		if (!response.ok) {
			throw new Error('Invalid email or password');
		} else {
			return await this.signIn(email, password);
		}
	}
}
