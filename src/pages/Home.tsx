import { useQuery } from '@tanstack/react-query';
import RecipeList from '../components/Recipes/RecipeList';
import Spinner from '../components/UI/Spinner';
import { getAllRecipes } from '../lib/firebase/getRecipes';
import useDocumentTitle from '../lib/hooks/useDocumentTitle';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { IRecipe } from '../lib/interfaces/recipe';

function Home(): JSX.Element {
	useDocumentTitle('Home | Tastebite Recipes App');
	const [lastProducts, setLastProduct] = useLocalStorage('last-recipe', null);

	const { isLoading, data } = useQuery({
		queryKey: ['recipes'],
		queryFn: () => getAllRecipes(),
		useErrorBoundary: true
	});

	const saveLastSeenRecipe = (recipe: IRecipe) => {
		setLastProduct(recipe);
	};

	if (isLoading) return <Spinner />;

	return data ? (
		<RecipeList
			onOpen={saveLastSeenRecipe}
			products={data}
			header="Wszystkich przepisów"
		/>
	) : (
		<div>Nie ma żadnego przepisu</div>
	);
}

export default Home;
