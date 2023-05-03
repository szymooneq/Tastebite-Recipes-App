import RecipeCard from '../Card/Card'
import { ListProps } from './List.types'

const List = ({ header, content }: ListProps): JSX.Element => (
	<div className="mx-3">
		<h2 className="mb-2 text-lg font-bold dark:text-white">{`${header} (${content.length}):`}</h2>
		<div className="grid gap-7 md:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
			{content.map((recipe) => (
				<RecipeCard key={recipe.id} {...recipe} />
			))}
		</div>
	</div>
)

export default List
