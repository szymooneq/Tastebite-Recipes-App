import { z } from 'zod'
import { defaultErrorMessages, recipeErrorMessages } from './messages'
import { NO_SPECIAL_CHARACTERS, FILE_SIZE, IMAGE_FORMATS } from './regex'

const { required_error, invalid_type_error } = defaultErrorMessages

const {
	name_too_many_characters,
	name_special_characters,
	description_too_many_characters,
	file_too_large,
	file_wrong_format,
	duration_overvalued,
	portions_overvalued,
	nutrion_overvalued
} = recipeErrorMessages

const name = z
	.string(defaultErrorMessages)
	.min(1, required_error)
	.max(50, name_too_many_characters)
	.trim()
	.regex(NO_SPECIAL_CHARACTERS, name_special_characters)

const description = z
	.string(defaultErrorMessages)
	.min(1, required_error)
	.max(550, description_too_many_characters)
	.trim()

const file = z
	.custom<File>()
	.optional()
	.refine((value) => !value || (value && value.size <= FILE_SIZE), file_too_large)
	.refine((value) => !value || (value && IMAGE_FORMATS.includes(value?.type)), file_wrong_format)

const duration = z
	.number(defaultErrorMessages)
	.gte(1, required_error)
	.lte(999, duration_overvalued)
	.int(invalid_type_error)
	.positive(invalid_type_error)
	.finite(invalid_type_error)

const level = z.enum(['easy', 'medium', 'hard'], {
	errorMap: (issue, _ctx) => {
		switch (issue.code) {
			case 'invalid_type':
				return { message: invalid_type_error }

			case 'invalid_enum_value':
				return { message: invalid_type_error }

			default:
				return { message: required_error }
		}
	}
})

const portions = z
	.number(defaultErrorMessages)
	.gte(1, required_error)
	.lte(99, portions_overvalued)
	.int(invalid_type_error)
	.positive(invalid_type_error)
	.finite(invalid_type_error)

const nutrion = z
	.number(defaultErrorMessages)
	.gte(0.1, required_error)
	.lte(9999, nutrion_overvalued)
	.positive(invalid_type_error)
	.finite(invalid_type_error)

export { name, description, file, duration, level, portions, nutrion }
