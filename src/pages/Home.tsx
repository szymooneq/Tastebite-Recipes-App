import { useQuery } from '@tanstack/react-query'
import RecipeList from '../components/Recipes/RecipeList'
import Spinner from '../components/UI/LoadingSpinner/LoadingSpinner'
import { getAllRecipes } from '../lib/firebase/getRecipes'
import useDocumentTitle from '../lib/hooks/useDocumentTitle'

function Home(): JSX.Element {
	useDocumentTitle('Home | Tastebite Recipes App')
	// const [lastProducts, setLastProduct] = useLocalStorage('last-recipe', null);

	const { isLoading, data } = useQuery({
		queryKey: ['recipes'],
		queryFn: () => getAllRecipes(),
		useErrorBoundary: true
	})

	/* const saveLastSeenRecipe = (recipe: IRecipe) => {
		setLastProduct(recipe);
	}; */

	if (isLoading) return <Spinner />

	return data ? (
		<RecipeList recipeList={data} header="Wszystkich przepisów" />
	) : (
		<div>Nie ma żadnego przepisu</div>
	)
}

export default Home
