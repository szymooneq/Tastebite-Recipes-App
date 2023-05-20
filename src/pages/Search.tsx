import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import RecipeList from '../components/Recipes/List/List'

export default function SearchPage(): JSX.Element {
	const { term } = useParams()

	const { isLoading, data } = useQuery({
		queryKey: ['recipes', term],
		queryFn: () => null,
		useErrorBoundary: true
	})

	if (isLoading) return <LoadingSpinner />

	if (data)
		return <RecipeList content={data} header={`Rezultat wyszukiwania dla "${term ?? ''}"`} />

	return <></>
}
