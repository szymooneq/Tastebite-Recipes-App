import { IRecipe } from '../../../lib/interfaces/Recipe.types'

export interface RecipeFormProps {
	initialValues: IRecipe
	onSubmit: (values: IRecipe) => void
}
