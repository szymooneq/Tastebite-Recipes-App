import { IRecipeApi } from '../../lib/interfaces/recipe';
import RecipeCard from './RecipeCard';

interface props {
	header: string;
	recipeList: IRecipeApi[];
}

function RecipeList({ header, recipeList }: props): JSX.Element {
	return (
		<div className="mx-3">
			<h2 className="mb-2 text-lg font-bold dark:text-white">
				{header} ({recipeList?.length || 0}):
			</h2>
			<div className="grid gap-7 md:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
				{recipeList &&
					recipeList.map((recipe) => (
						<RecipeCard key={recipe.id} recipe={recipe} />
					))}
			</div>
		</div>
	);
}

export default RecipeList;
