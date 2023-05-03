import { IRecipeApi } from '../../lib/interfaces/recipe'

export interface TableProps {
	recipes: IRecipeApi[]
	deleteRecipe: (recipe: IRecipeApi, cb: () => void) => Promise<void>
}
