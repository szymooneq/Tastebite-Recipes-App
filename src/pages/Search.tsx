import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/Recipes/RecipeList';
import Spinner from '../components/UI/Spinner';
import { getSearchingRecipes } from '../lib/firebase/getRecipes';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { IRecipe } from '../lib/interfaces/recipe';

function Search(): JSX.Element {
	const { term } = useParams();
	const [setLastProduct] = useLocalStorage('last-hotel', null);

	const { isLoading, data } = useQuery({
		queryKey: ['recipes', term],
		queryFn: () => {
			getSearchingRecipes(term);
		},
		useErrorBoundary: true
	});

	const saveLastSeenRecipe = (recipe: IRecipe) => {
		setLastProduct(recipe);
	};

	if (isLoading) return <Spinner />;

	return data ? (
		<>
			<RecipeList
				onOpen={saveLastSeenRecipe}
				products={data}
				header={`Rezultat wyszukiwania dla "${term ?? ''}"`}
			/>
			{console.log(data)}
		</>
	) : (
		<div>Nie ma żadnego przepisu</div>
	);
}

export default Search;
