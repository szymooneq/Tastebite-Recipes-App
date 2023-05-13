import { z } from 'zod'

const NO_SPECIAL_CHARACTERS = /^[A-Za-z0-9 ]+$/
const FILE_SIZE = 1024000
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

const REQUIRED = {
	required_error: 'Pole wymagane',
	invalid_type_error: 'Nieprawidłowa wartość'
}

const name = z
	.string(REQUIRED)
	.min(1, 'Pole wymagane')
	.max(50, 'Maksymalna ilość znaków wynosi 50')
	.trim()
	.regex(NO_SPECIAL_CHARACTERS, 'Tekst zawiera znaki specjalne')

const description = z
	.string(REQUIRED)
	.min(1, 'Pole wymagane')
	.max(550, 'Maksymalna ilość znaków wynosi 550')
	.trim()

const file = z
	.custom<File>()
	.optional()
	.refine(
		(value) => !value || (value && value.size <= FILE_SIZE),
		'Maksymalna wielkość pliku wynosi 1MB.'
	)
	.refine(
		(value) => !value || (value && FILE_FORMATS.includes(value?.type)),
		'Dozwolone formaty: jpg, jpeg, gif, png'
	)

const duration = z
	.number(REQUIRED)
	.gte(1, 'Pole wymagane')
	.lte(999, 'Maksymalna wartość wynosi 999')
	.int('Nieprawidłowa wartość')
	.positive('Nieprawidłowa wartość')
	.finite('Nieprawidłowa wartość')

const level = z.enum(['easy', 'medium', 'hard'], {
	errorMap: (issue, _ctx) => {
		switch (issue.code) {
			case 'invalid_type':
				return { message: 'Nieprawidłowa wartość' }

			case 'invalid_enum_value':
				return { message: 'Nieprawidłowa wartość' }

			default:
				return { message: 'Pole wymagane' }
		}
	}
})

const portions = z
	.number(REQUIRED)
	.gte(1, 'Pole wymagane')
	.lte(99, 'Maksymalna wartość wynosi 999')
	.int('Nieprawidłowa wartość')
	.positive('Nieprawidłowa wartość')
	.finite('Nieprawidłowa wartość')

const nutrions = z
	.number(REQUIRED)
	.gte(0.1, 'Pole wymagane')
	.lte(9999, 'Maksymalna wartość wynosi 999')
	.positive('Nieprawidłowa wartość')
	.finite('Nieprawidłowa wartość')

export { name, description, file, duration, level, portions, nutrions }
