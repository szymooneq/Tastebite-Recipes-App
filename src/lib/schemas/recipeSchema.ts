import { z } from 'zod'
import { name } from './recipe'

const NO_SPECIAL_CHARACTERS = /^[A-Za-z0-9 ]+$/
// no special characters

const FILE_SIZE = 1024000
// max 1mb

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
// supported formats: jpg, jpeg, gif, png

const nutrionSchema = z
	.number({
		required_error: 'Pole wymagane',
		invalid_type_error: 'Nieprawidłowa wartość'
	})
	.gte(0.1, 'Pole wymagane')
	.lte(9999, 'Maksymalna wartość wynosi 999')
	.positive('Nieprawidłowa wartość')
	.finite('Nieprawidłowa wartość')

/* const arraySchema = z
	.string()
	.array()
	.min(5, 'Wymagana przynajmniej jedna pozycja')
	.max(30, 'Maksymalna liczba pól wynosi 30')
	.nonempty('Wymagana przynajmniej jedna pozycja'); */

export const recipeSchema = z.object({
	name: name,
	description: z
		.string({
			required_error: 'Pole wymagane',
			invalid_type_error: 'Nieprawidłowa wartość'
		})
		.min(1, 'Pole wymagane')
		.max(550, 'Maksymalna ilość znaków wynosi 550')
		.trim(),
	file: z
		.custom<File>()
		.optional()
		.refine(
			(value) => !value || (value && value.size <= FILE_SIZE),
			'Maksymalna wielkość pliku wynosi 1MB.'
		)
		.refine(
			(value) => !value || (value && FILE_FORMATS.includes(value?.type)),
			'Dozwolone formaty: jpg, jpeg, gif, png'
		),
	details: z.object({
		duration: z
			.number({
				required_error: 'Pole wymagane',
				invalid_type_error: 'Nieprawidłowa wartość'
			})
			.gte(1, 'Pole wymagane')
			.lte(999, 'Maksymalna wartość wynosi 999')
			.int('Nieprawidłowa wartość')
			.positive('Nieprawidłowa wartość')
			.finite('Nieprawidłowa wartość'),
		level: z.enum(['easy', 'medium', 'hard'], {
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
		}),
		portions: z
			.number({
				required_error: 'Pole wymagane',
				invalid_type_error: 'Nieprawidłowa wartość'
			})
			.gte(1, 'Pole wymagane')
			.lte(99, 'Maksymalna wartość wynosi 999')
			.int('Nieprawidłowa wartość')
			.positive('Nieprawidłowa wartość')
			.finite('Nieprawidłowa wartość')
	}),
	nutrions: z.object({
		calories: nutrionSchema,
		protein: nutrionSchema,
		carbohydrates: nutrionSchema,
		fat: nutrionSchema
	})
	/* ingredients: arraySchema,
	steps: arraySchema */
})
