import { setError, superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions, type RequestEvent, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { AuthProvider } from '$lib/providers/auth';

const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8).max(64)
});

export const load = async () => {
	const signUpForm = await superValidate(signUpSchema);
	return { signUpForm };
};

export const actions: Actions = {
	signUp: async (event: RequestEvent<{ email?: string; password?: string }>) => {
		const authProvider = new AuthProvider(event);

		const form = await superValidate(event.request.clone(), signUpSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await authProvider.signUp(form.data.email, form.data.password);
		} catch (e: unknown) {
			console.debug(e);
			return setError(form, 'email', (e as Error)?.message || 'Invalid email or password');
		}
		throw redirect(302, '/home');
	}
};
