import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { Recipe } from '../../lib/interfaces/recipe';
import Badges from '../UI/Badges';
import Image from '../UI/ImageWithSkeleton/Image';

interface props {
	onOpen: () => void;
	recipe: Recipe;
}

function RecipeCard({ onOpen, recipe }: props): JSX.Element {
	/* 	const clickHandler = () => {
		onOpen(props);
	}; */

	return (
		<div className="w-100% rounded-lg shadow-md hover:shadow-2xl transition bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 xl:w-full">
			<Image
				className="w-full h-60 object-cover object-center rounded-t-lg"
				src={recipe.img}
				alt={recipe.name}
			/>

			<div className="p-4 flex flex-col gap-2">
				<h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{recipe.name}
				</h5>

				<Badges {...recipe.details} />

				<p className="min-h-[4.5rem] text-gray-700 dark:text-gray-400">
					{recipe.description.slice(0, 100).concat('...')}
				</p>

				<Link
					to={`/przepis/${recipe.id}`}
					// onClick={clickHandler}
					className="py-2 px-3 w-max inline-flex justify-center items-center text-sm font-medium rounded-lg focus:ring-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
					Sprawdź
					<ArrowRightIcon className="ml-2 -mr-1 w-4 h-4" />
				</Link>
			</div>
		</div>
	);
}

export default RecipeCard;
