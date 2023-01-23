import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/Recipes/RecipeList';
import Spinner from '../components/UI/Spinner';
import { getSearchingRecipes } from '../lib/firebase/getRecipes';
import useLocalStorage from '../lib/hooks/useLocalStorage';
import { IRecipe } from '../lib/interfaces/recipe';

function Search(): JSX.Element {
	const { term } = useParams();

	const { isLoading, data } = useQuery({
		queryKey: ['recipes', term],
		queryFn: () => getSearchingRecipes(term!),
		useErrorBoundary: true
	});

	if (isLoading) return <Spinner />;

	return (
		<>
			{data && (
				<RecipeList
					products={data}
					header={`Rezultat wyszukiwania dla "${term ?? ''}"`}
				/>
			)}
		</>
	);
}

export default Search;
