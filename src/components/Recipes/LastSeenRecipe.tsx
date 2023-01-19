import { Link } from 'react-router-dom';
import { Recipe } from '../../lib/interfaces/recipe';

interface props {
	recipe: Recipe;
	onRemove: () => void;
}

function LastSeenRecipe({ recipe, onRemove }: props): JSX.Element {
	return (
		<div className="m-1 p-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
			<div className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
				Ostatnio oglądałeś ten przepis. Wciąż zainteresowany?
			</div>

			<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
				{recipe.name}
			</p>
			<div className="flex justify-between">
				<Link
					to={`/przepis/${recipe.id}/${recipe.name}`}
					className="text-sm px-4 py-1.5 font-medium focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 rounded-lg  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
					Tak
				</Link>
				<button
					// onClick={recipe.onRemove}
					className="text-sm px-4 py-1.5 font-medium focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
					Nie
				</button>
			</div>
		</div>
	);
}

export default LastSeenRecipe;
