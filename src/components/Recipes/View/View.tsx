import { filterDetails, filterNutrions } from '@/lib/helpers/filterRecipeData'
import { ViewProps } from './View.types'

import DetailCard from '@/components/Recipes/DetailsCard'
import Steps from '@/components/Recipes/Steps'
import Badges from '@/components/UI/Badges'
import Image from '@/components/UI/Image'

const View = ({ content }: ViewProps) => {
	const { name, description, details, nutrions, ingredients, steps, img } = content

	return (
		<div className="mx-4 flex flex-col gap-4 lg:flex-row lg:justify-center break-words">
			<div className="flex flex-col gap-3 flex-1 lg:max-w-[40rem] xl:max-w-[50rem]">
				<h2 className="text-3xl font-bold dark:text-white">{name}</h2>
				<Badges {...details} />

				<Image
					className="w-full h-60 md:h-80 lg:h-96 rounded object-cover object-center"
					src={img}
					alt={`Zdjęcie podglądowe przepisu "${name}"`}
				/>
				<p className="italic dark:text-gray-400">{description}</p>
				<Steps content={steps} isMobile />
			</div>

			<div className="flex flex-row flex-wrap h-max gap-3 lg:flex-col lg:sticky lg:top-3 lg:w-[23rem]">
				<DetailCard color="amber" title="Podstawowe informacje:" content={filterDetails(details)} />
				<DetailCard color="rose" title="Wartości odżywcze:" content={filterNutrions(nutrions)} />
				<DetailCard color="blue" title="Składniki:" list={ingredients} />
				<Steps content={steps} />
			</div>
		</div>
	)
}

export default View
