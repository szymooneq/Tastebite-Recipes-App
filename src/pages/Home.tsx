import { useQuery } from '@tanstack/react-query';
import RecipeList from '../components/Recipes/RecipeList';
import LoadingIcon from '../components/UI/LoadingIcon';
import { getAllRecipes } from '../lib/firebase/getRecipes';
import useDocumentTitle from '../lib/hooks/useDocumentTitle';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { Recipe } from '../lib/interfaces/recipe';

function Home(): JSX.Element {
	useDocumentTitle('Home | Tastebite Recipes App');
	const [lastProducts, setLastProduct] = useLocalStorage('last-recipe', null);

	const { isLoading, error, data } = useQuery({
		queryKey: ['recipes'],
		queryFn: () => getAllRecipes()
	});

	const saveLastSeenRecipe = (recipe: Recipe) => {
		setLastProduct(recipe);
	};

	const removeLastSeenRecipe = () => {
		setLastProduct(null);
	};

	if (isLoading) return <LoadingIcon />;

	if (error) return <div>{`An error has occurred: ${error.message}`}</div>;

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
