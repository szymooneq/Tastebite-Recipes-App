import { z } from 'zod'

const email = z
	.string({
		required_error: 'Pole wymagane',
		invalid_type_error: 'Nieprawidłowa wartość'
	})
	.email('Wprowadź poprawny adres e-mail.')

const password = z.string({
	required_error: 'Pole wymagane',
	invalid_type_error: 'Nieprawidłowa wartość'
})

const confirmPassword = z.string({
	required_error: 'Pole wymagane',
	invalid_type_error: 'Nieprawidłowa wartość'
})
