import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getRecipeData } from '@/lib/firebase/getRecipe'
import { updateRecipe } from '@/lib/firebase/postRecipe'
import { useAuth } from '@/lib/hooks/useAuth'
import { useDocumentTitle } from '@/lib/hooks/useDocumentTitle'
import { IRecipe } from '@/lib/types/Recipe.types'

import RecipeForm from '@/components/Forms/RecipeForm'
import LoadingSpinner from '@/components/UI/LoadingSpinner'

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

	if (isLoading || !data) return <LoadingSpinner />

	const initialValues = { ...data, file: null }

	// TODO: error handling from the API
	const onSubmit = async (values: IRecipe) => {
		const { createdAt } = data
		await updateRecipe(values, user?.uid, createdAt.seconds, id)
		navigate('/profile/recipes')
	}

	return <RecipeForm initialValues={initialValues} onSubmit={onSubmit} />
}
