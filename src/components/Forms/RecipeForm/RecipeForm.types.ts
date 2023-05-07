import { FormikProps } from 'formik'

export interface RecipeFormProps<T> {
	control: FormikProps<T>
}
