import { z } from 'zod';

export const loginSchema = z.object({
	email: z
		.string({
			required_error: 'Pole wymagane',
			invalid_type_error: 'Nieprawidłowa wartość'
		})
		.email('Wprowadź poprawny adres e-mail.'),
	password: z.string({
		required_error: 'Pole wymagane',
		invalid_type_error: 'Nieprawidłowa wartość'
	})
});
