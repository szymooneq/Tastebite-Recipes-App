import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import RecipeForm from '../../../../components/Forms/RecipeForm/RecipeForm'
import Spinner from '../../../../components/UI/LoadingSpinner/LoadingSpinner'
import { IRecipe } from '../../../../lib/interfaces/Recipe.types'
import { useAuth } from '../../../../lib/hooks/useAuth'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { updateRecipe } from '../../../../lib/firebase/postRecipe'
import { useDocumentTitle } from '../../../../lib/hooks/useDocumentTitle'
import { recipeSchema } from '../../../../lib/schemas'
import { getRecipeData } from '../../../../lib/firebase/getRecipe'

export default function EditRecipePage(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Edycja')
	const { id } = useParams()
	const { user } = useAuth()
	const navigate = useNavigate()

	if (!id || !user) {
		navigate('/')
		return <></>
	}

	const { isLoading, data } = useQuery({
		queryKey: ['editRecipe', id],
		queryFn: () => getRecipeData(id, user.uid),
		useErrorBoundary: true
	})

	const formik = useFormik({
		initialValues: { ...data!, file: null },
		validationSchema: toFormikValidationSchema(recipeSchema),
		onSubmit: (values: IRecipe) => {
			const { createdAt } = data!
			updateRecipe(values, user?.uid, createdAt.seconds, id)
			navigate('/profil/przepisy')
		}
	})

	if (isLoading) return <Spinner />

	return <RecipeForm control={formik} />
}
