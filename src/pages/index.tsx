import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '@/lib/firebase/getRecipe'
import { useDocumentTitle } from '@/lib/hooks/useDocumentTitle'

import RecipeList from '@/components/Recipes/List'
import LoadingSpinner from '@/components/UI/LoadingSpinner'

export default function HomePage(): JSX.Element {
	useDocumentTitle('Home | Tastebite Recipes App')

	const { isLoading, data } = useQuery({
		queryKey: ['recipes'],
		queryFn: () => getRecipes(),
		useErrorBoundary: true
	})

	if (isLoading) return <LoadingSpinner />

	if (data) return <RecipeList content={data} header="Wszystkich przepisów" />

	return <div>Nie ma żadnego przepisu</div>
}
