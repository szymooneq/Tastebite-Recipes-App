import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { IRecipe } from '../../lib/interfaces/recipe';
import Badges from '../UI/Badges';
import Button from '../UI/Button';
import CustomLink from '../UI/CustomLink';
import Image from '../UI/Image';

interface props {
	onOpen: () => void;
	recipe: IRecipe;
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

				<Badges
					duration={recipe.details.duration}
					level={recipe.details.level}
					rating={5}
				/>

				<p className="min-h-[4.5rem] text-gray-700 dark:text-gray-400">
					{recipe.description.slice(0, 100).concat('...')}
				</p>

				<CustomLink href={`/przepis/${recipe.id}`} color="red">
					Sprawdź <ArrowRightIcon className="ml-2 -mr-1 w-4 h-4" />
				</CustomLink>
			</div>
		</div>
	);
}

export default RecipeCard;
