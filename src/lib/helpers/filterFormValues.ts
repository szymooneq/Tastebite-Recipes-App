import { IRecipe } from '../interfaces/recipe'
import { roundToTwo } from './roundToTwo'

const removeStringWhitespaces = (value: string) => {
	return value.trim().replace(/  +/g, ' ')
}

const removeArrayWhitespaces = (array: string[]) => {
	return array.filter((item) => item.length > 0).map((item) => removeStringWhitespaces(item))
}

export const filterFormValues = (values: IRecipe) => {
	const { name, description, status, img, details, nutrions, ingredients, steps } = values
	const { duration, level, portions } = details
	const { calories, protein, carbohydrates, fat } = nutrions

	return {
		name: removeStringWhitespaces(name),
		description: removeStringWhitespaces(description),
		status: status,
		// img: downloadURL ? downloadURL : null,
		details: {
			duration: Number(duration),
			level: level,
			portions: Number(portions)
		},
		nutrions: {
			calories: roundToTwo(calories),
			protein: roundToTwo(protein),
			carbohydrates: roundToTwo(carbohydrates),
			fat: roundToTwo(fat)
		},
		ingredients: removeArrayWhitespaces(ingredients),
		steps: removeArrayWhitespaces(steps)
		// userId: user?.uid,
		// createdAt: timeStamp
	}
}
