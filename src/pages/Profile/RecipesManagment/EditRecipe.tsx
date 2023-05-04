import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import RecipeForm from '../../../components/Forms/RecipeForm/RecipeForm'
import Spinner from '../../../components/UI/LoadingSpinner/LoadingSpinner'
import { getRecipeToEdit } from '../../../lib/firebase/getRecipes'
import useDocumentTitle from '../../../lib/hooks/useDocumentTitle'
import { IRecipe } from '../../../lib/interfaces/recipe'
import { recipeSchema } from '../../../lib/schemas/recipeSchema'
import { useAuth } from '../../../lib/hooks/useAuth'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { updateRecipe } from '../../../lib/firebase/postRecipe'

// TODO: redirect
export default function EditRecipe(): JSX.Element {
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
		queryFn: () => getRecipeToEdit(id, user, navigate),
		cacheTime: 1,
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
