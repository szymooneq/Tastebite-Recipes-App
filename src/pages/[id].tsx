import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Details from '../components/Recipes/[id]/Details'
import Ingredients from '../components/Recipes/[id]/Ingredients'
import Nutrions from '../components/Recipes/[id]/Nutrions'
import Steps from '../components/Recipes/[id]/Steps'
import Badges from '../components/UI/Badges/Badges'
import Image from '../components/UI/Image/Image'
import Spinner from '../components/UI/LoadingSpinner/LoadingSpinner'
import { getRecipeData } from '../lib/firebase/getRecipes'

function ProductView(): JSX.Element {
	const { id } = useParams()
	const navigate = useNavigate()

	const { isLoading, data } = useQuery({
		queryKey: ['recipe', id],
		queryFn: () => {
			if (id) return getRecipeData(id, navigate)
		},
		useErrorBoundary: true
	})

	// TODO: rating system

	if (isLoading) return <Spinner />

	return (
		<div className="mx-4 flex flex-col gap-4 lg:flex-row lg:justify-center break-words">
			{data && (
				<>
					<div className="flex flex-col gap-3 flex-1 lg:max-w-[40rem] xl:max-w-[50rem]">
						<h2 className="text-3xl font-bold dark:text-white">{data.name}</h2>
						<Badges {...data.details} />

						<Image
							className="w-full h-60 md:h-80 lg:h-96 rounded object-cover object-center"
							src={data.img}
							alt={`Zdjęcie podglądowe przepisu "${data.name}"`}
						/>
						<p className="italic dark:text-gray-400">{data.description}</p>
						<div className="my-3 hidden lg:block dark:text-white">
							<Steps data={data.steps} />
						</div>
					</div>

					<div className="flex flex-row flex-wrap h-max gap-3 lg:flex-col lg:sticky lg:top-3 lg:w-[23rem]">
						<Details {...data.details} />
						<Nutrions {...data.nutrions} />
						<Ingredients data={data.ingredients} />
						<div className="my-3 block lg:hidden dark:text-white">
							<Steps data={data.steps} />
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default ProductView
