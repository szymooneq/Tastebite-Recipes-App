export interface IRecipeDetails {
	duration: number
	level: 'easy' | 'medium' | 'hard'
	portions: number
}

export interface IRecipeNutrions {
	calories: number
	carbohydrates: number
	fat: number
	protein: number
}

export interface IRecipe {
	name: string
	description: string
	status: boolean
	file: Blob | null
	img: string | null
	details: IRecipeDetails
	nutrions: IRecipeNutrions
	ingredients: string[]
	steps: string[]
}

export interface IRecipeApi extends IRecipe {
	id: string
	userId: string
	createdAt: {
		seconds: number
		nanoseconds: number
	}
	editedAt: string
}
