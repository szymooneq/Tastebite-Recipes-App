import { useQuery } from '@tanstack/react-query'
import RecipeList from '../components/Recipes/List/List'
import Spinner from '../components/UI/LoadingSpinner/LoadingSpinner'
import { getRecipes } from '../lib/firebase/getRecipe'
import { useDocumentTitle } from '../lib/hooks/useDocumentTitle'

export default function HomePage(): JSX.Element {
	useDocumentTitle('Home | Tastebite Recipes App')

	const { isLoading, data } = useQuery({
		queryKey: ['recipes'],
		queryFn: () => getRecipes(),
		useErrorBoundary: true
	})

	if (isLoading) return <Spinner />

	if (data) return <RecipeList content={data} header="Wszystkich przepisów" />

	return <div>Nie ma żadnego przepisu</div>
}
