import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/UI/LoadingSpinner/LoadingSpinner'
import { getRecipeData } from '../lib/firebase/getRecipes'
import View from '../components/Recipes/View/View'

// TODO: Rating system
export default function Page(): JSX.Element {
	const { id } = useParams()
	const navigate = useNavigate()

	const { isLoading, data } = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => {
			if (id) return getRecipeData(id, navigate)
		},
		useErrorBoundary: true
	})

	if (isLoading) return <Spinner />

	if (data) return <View content={data} />

	return <></>
}
