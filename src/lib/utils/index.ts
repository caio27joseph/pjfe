export const getInitials = (name: string) => {
	try {
		const names = name.split(' ');
		let initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	} catch (error) {
		return '?';
	}
};

export const cleanFormData = (form: FormData) => {
	const data = Object.fromEntries(form);
	Object.keys(data).forEach((key) => data[key] === '' && delete data[key]);
	return data;
};
