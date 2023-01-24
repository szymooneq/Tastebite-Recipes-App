import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/Recipes/RecipeList';
import Spinner from '../components/UI/Spinner';
import { getRecipesBySearch } from '../lib/firebase/getRecipes';
// import useLocalStorage from '../lib/hooks/useLocalStorage';

function Search(): JSX.Element {
	const { term } = useParams();

	const { isLoading, data } = useQuery({
		queryKey: ['recipes', term],
		queryFn: () => {
			if (term) {
				return getRecipesBySearch(term);
			} else {
				return [];
			}
		},
		useErrorBoundary: true
	});

	if (isLoading) return <Spinner />;

	return (
		<>
			{data && (
				<RecipeList
					recipeList={data}
					header={`Rezultat wyszukiwania dla "${term ?? ''}"`}
				/>
			)}
		</>
	);
}

export default Search;
