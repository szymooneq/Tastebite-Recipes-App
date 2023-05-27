import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getRecipeData } from '../../lib/firebase/getRecipe'
import View from '../../components/Recipes/View/View'
import LoadingSpinner from '../../components/UI/LoadingSpinner/LoadingSpinner'

// TODO: Rating system
export default function RecipePage(): JSX.Element {
	const { id } = useParams()
	const navigate = useNavigate()

	if (!id) {
		navigate('/')
		return <></>
	}

	const { isLoading, data } = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => getRecipeData(id),
		useErrorBoundary: true
	})

	if (isLoading) return <LoadingSpinner />

	if (data) return <View content={data} />

	return <></>
}
