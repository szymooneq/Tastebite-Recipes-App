import { useQuery } from '@tanstack/react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Details from '../components/Recipes/[id]/Details';
import Ingredients from '../components/Recipes/[id]/Ingredients';
import Nutrions from '../components/Recipes/[id]/Nutrions';
import Badges from '../components/UI/Badges';
import Image from '../components/UI/Image';
import Spinner from '../components/UI/Spinner';
import { getRecipeView } from '../lib/firebase/getRecipes';

function ProductView(): JSX.Element {
	const { id } = useParams();
	const navigate = useNavigate();

	const { isLoading, data } = useQuery({
		queryKey: ['recipe', id],
		queryFn: () =>
			getRecipeView(id!, navigate).then((res) => {
				if (res) {
					document.title = `${res.name} | Tastebite Recipes App`;
					return res;
				}
			}),
		useErrorBoundary: true
	});

	// TODO: rating system

	if (isLoading) return <Spinner />;

	return (
		<div className="mx-4 flex flex-col gap-4 lg:flex-row lg:justify-center">
			{data && (
				<>
					<div className="flex flex-col gap-3 lg:w-[50rem] xl:w-[60rem]">
						<h1 className="text-3xl font-bold dark:text-white">{data.name}</h1>
						<Badges {...data.details} />

						<Image
							className="w-full h-60 md:h-80 lg:h-96 rounded object-cover object-center"
							src={data.img}
							alt="Meal preview"
						/>
						<p className="text-justify italic dark:text-gray-400">
							{data.description}
						</p>
						<div className="my-3 hidden lg:block dark:text-white">
							<h2 className="mb-2 text-2xl font-bold text-green-600 dark:text-green-500">
								Wykonanie
							</h2>
							<ol className="list-decimal list-inside dark:text-gray-400">
								{data.steps.map((item, id) => (
									<li key={id} className="mb-3">
										{item}
									</li>
								))}
							</ol>
						</div>
					</div>

					<div className="flex flex-row flex-wrap h-max gap-3 lg:flex-col lg:sticky lg:top-0 lg:w-[20rem]">
						<Details {...data.details} />
						<Nutrions {...data.nutrions} />
						<Ingredients data={data.ingredients} />
						<div className="my-3 block lg:hidden dark:text-white">
							<h2 className="mb-2 text-2xl font-bold text-green-600 dark:text-green-500">
								Wykonanie
							</h2>
							<ol className="list-decimal list-inside dark:text-gray-400">
								{data.steps.map((item, id) => (
									<li key={id} className="mb-3">
										{item}
									</li>
								))}
							</ol>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default ProductView;
