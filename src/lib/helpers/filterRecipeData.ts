import { IRecipeDetails, IRecipeNutrions } from '../interfaces/recipe'
import { roundToTwo } from './roundToTwo'

const filterNutrions = (data: IRecipeNutrions) => {
	const { calories, protein, carbohydrates, fat } = data

	const filteredData = [
		{
			title: 'Wartość energetyczna',
			description: `${roundToTwo(calories * 4.2)} kJ / ${calories} kcal`
		},
		{
			title: 'Białko',
			description: `${protein} g`
		},
		{
			title: 'Węglowodany',
			description: `${carbohydrates} g`
		},
		{
			title: 'Tłuszcze',
			description: `${fat} g`
		}
	]

	return filteredData
}

const filterDetails = (data: IRecipeDetails) => {
	const { duration, level, portions } = data

	const name = {
		easy: 'Łatwy',
		medium: 'Średni',
		hard: 'Trudny'
	}

	const filteredData = [
		{
			title: 'Całkowity czas',
			description: `${duration} min`
		},
		{
			title: 'Trudność',
			description: name[level]
		},
		{
			title: 'Porcji',
			description: `${portions}`
		}
	]

	return filteredData
}

export { filterNutrions, filterDetails }
