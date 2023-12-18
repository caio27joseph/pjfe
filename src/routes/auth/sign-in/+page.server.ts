import { setError, superValidate } from 'sveltekit-superforms/server';
import { type Actions, type RequestEvent, fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { AuthProvider } from '$lib/providers/auth';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(64).trim()
});

export const load = async () => {
	const signInForm = await superValidate(signInSchema);

	return { signInForm };
};

export const actions: Actions = {
	signIn: async (event: RequestEvent<{ email?: string; password?: string }>) => {
		const form = await superValidate(event.request.clone(), signInSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const authProvider = new AuthProvider(event);
		try {
			await authProvider.signIn(form.data.email, form.data.password);
		} catch (error) {
			return setError(form, 'email', 'Invalid email or password');
		}
		throw redirect(302, '/home');
	}
};
