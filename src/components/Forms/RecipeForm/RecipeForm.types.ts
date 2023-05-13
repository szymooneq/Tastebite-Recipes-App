import { FormikProps } from 'formik'
import { IRecipe } from '../../../lib/interfaces/Recipe.types'

export interface RecipeFormProps {
	control: FormikProps<IRecipe>
}
