import { z } from 'zod'
import { authErrorMessages } from './messages'
import * as recipe from './Recipe.schema'
import * as auth from './Auth.schema'

const { name, description, file, duration, level, portions, nutrion } = recipe
const { email, password, confirmPassword } = auth
const { different_passwords } = authErrorMessages

const loginSchema = z.object({
	email,
	password
})

const registerSchema = z
	.object({
		email,
		password,
		confirmPassword
	})
	.refine((value) => value.password === value.confirmPassword, {
		message: different_passwords,
		path: ['confirmPassword']
	})

const recipeSchema = z.object({
	name,
	description,
	file,
	details: z.object({
		duration,
		level,
		portions
	}),
	nutrions: z.object({
		calories: nutrion,
		protein: nutrion,
		carbohydrates: nutrion,
		fat: nutrion
	})
	/* ingredients: arraySchema,
		steps: arraySchema */
})

export { loginSchema, registerSchema, recipeSchema }
