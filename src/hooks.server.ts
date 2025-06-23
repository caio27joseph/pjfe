// import { redirect } from '@sveltejs/kit';

// import { setSession } from '$houdini';
import { AuthProvider } from '$lib/providers/auth';

export async function handleFetch({ fetch, request, event }) {
	const authProvider = new AuthProvider(event);
	const res = authProvider.handleFetchPossibleTokenExpiration(fetch, request);
	// const res = fetch(request);
	return res;
}

export async function handle(input) {
	const authProvider = new AuthProvider(input.event);

	return authProvider.handleProtectedRoute(input);
}
