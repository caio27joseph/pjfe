import { API_ENDPOINT } from '$env/static/private';
import { redirect, type RequestEvent, type MaybePromise, type ResolveOptions } from '@sveltejs/kit';

const authRoutes = [
	'/auth/sign-in',
	'/auth/sign-up',
	'/auth/forgot-password',
	'/auth/reset-password'
];
const unprotectedRoutes = ['/', ...authRoutes];

export class AuthProvider {
	constructor(private readonly event: RequestEvent) {}
	// sign In should be a method using normal fetch as shold in the comments

	private get access_token(): string | undefined {
		return this.event.cookies.get('access_token');
	}
	private set access_token(value: string) {
		this.event.cookies.set('access_token', value, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			httpOnly: true,
			sameSite: 'lax'
		});
	}

	private get refresh_token(): string | undefined {
		return this.event.cookies.get('refresh_token');
	}
	private set refresh_token(value: string) {
		this.event.cookies.set('refresh_token', value, {
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			httpOnly: true,
			sameSite: 'lax'
		});
	}
	private deleteTokens() {
		this.event.cookies.delete('access_token');
		this.event.cookies.delete('refresh_token');
	}

	async signIn(email: string, password: string) {
		const url = API_ENDPOINT + '/auth/login';
		const response = await this.event.fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		if (!response.ok) {
			throw Error('Invalid email or password');
		} else {
			const data = await response.json();
			const { access_token, refresh_token } = data;
			if (!access_token) {
				throw new Error('No access token');
			}
			this.access_token = access_token;
			this.refresh_token = refresh_token;
			return true;
		}
	}

	async signUp(email: string, password: string) {
		const url = API_ENDPOINT + '/auth/register';
		const response = await this.event.fetch(url, {
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

	private async isUnauthorizedResponse(response: Response) {
		const res = response.clone();
		const data = await res.json();
		if (response.status === 401) {
			return true;
		}
		if (data?.errors?.length) {
			return data.errors[0].extensions.status === 401;
		}
		return false;
	}

	async handleFetchPossibleTokenExpiration(
		fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
		request: Request
	) {
		if (unprotectedRoutes.includes(this.event.url.pathname)) {
			return fetch(request);
		}
		const { access_token, refresh_token } = this;

		request.headers.set('authorization', 'Bearer ' + access_token);

		const backupRequest = request.clone();
		const res = await fetch(request);

		if (await this.isUnauthorizedResponse(res)) {
			if (!refresh_token) {
				if (this.event.url.pathname !== '/auth/sign-in') throw redirect(302, '/auth/sign-in');
				return res;
			}
			const refreshRes = await fetch(API_ENDPOINT + '/auth/refresh', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ refresh_token })
			});
			if (await this.isUnauthorizedResponse(refreshRes)) {
				this.deleteTokens();
				throw redirect(302, '/auth/sign-in');
			}
			const data = await refreshRes.json();
			const { access_token, refresh_token: new_refresh_token } = data;
			this.access_token = access_token;
			this.refresh_token = new_refresh_token;

			backupRequest.headers.set('authorization', 'Bearer ' + access_token);

			const response = await this.event.fetch(backupRequest);

			return response;
		}
		return res;
	}

	async handleProtectedRoute({
		resolve,
		event
	}: {
		event: RequestEvent;
		resolve(event: RequestEvent, opts?: ResolveOptions): MaybePromise<Response>;
	}) {
		const authenticated = !!this.access_token;

		const path = event.url.pathname;

		if (authenticated) {
			if (authRoutes.includes(path)) {
				console.debug(`from ${path},redirecting to home because user is authenticated`);
				throw redirect(302, '/home');
			}
			return resolve(event);
		}
		if (unprotectedRoutes.includes(path)) {
			console.debug(`from ${path},not redirecting because the route is unprotected`);
			return resolve(event);
		}
		console.debug(`from ${path}, redirecting to sign in because user is not authenticated`);
		throw redirect(302, '/auth/sign-in');
	}
}
