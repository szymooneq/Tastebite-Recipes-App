import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/Recipes/RecipeList';
import LoadingIcon from '../components/UI/LoadingIcon';
import { getSearchingRecipes } from '../lib/firebase/getRecipes';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { IRecipe } from '../lib/interfaces/recipe';

// TODO: better searchbar

function Search(): JSX.Element {
	const { term } = useParams();
	const [setLastProduct] = useLocalStorage('last-hotel', null);

	const { isLoading, error, data } = useQuery({
		queryKey: ['recipes', term],
		queryFn: () => getSearchingRecipes(term)
	});

	const saveLastSeenRecipe = (recipe: IRecipe) => {
		setLastProduct(recipe);
	};

	if (isLoading) return <LoadingIcon />;

	if (error) return <div>{`An error has occurred: ${error.message}`}</div>;

	return data ? (
		<RecipeList
			onOpen={saveLastSeenRecipe}
			products={data}
			header={`Rezultat wyszukiwania dla "${term ?? ''}"`}
		/>
	) : (
		<div>Nie ma żadnego przepisu</div>
	);
}

export default Search;
