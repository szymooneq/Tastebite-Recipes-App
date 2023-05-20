import { useQuery } from '@tanstack/react-query'
import RecipeTable from '../../../components/Table/Table'
import CustomLink from '../../../components/UI/CustomLink/CustomLink'
import { useAuth } from '../../../lib/hooks/useAuth'
import { getRecipes } from '../../../lib/firebase/getRecipe'
import LoadingSpinner from '../../../components/UI/LoadingSpinner/LoadingSpinner'
import { useDocumentTitle } from '../../../lib/hooks/useDocumentTitle'

export default function UserRecipesPage(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy')
	const { user } = useAuth()

	if (!user) return <></>

	const { isLoading, data } = useQuery({
		queryKey: ['userRecipes', user.uid],
		queryFn: () => getRecipes(user.uid),
		useErrorBoundary: true
	})

	if (isLoading) return <LoadingSpinner />

	return (
		<>
			<div className="px-3 mt-2 inline-flex justify-between w-full items-center gap-5 lg:px-0">
				<h2 className="text-xl font-bold dark:text-white lg:text-3xl">Twoje przepisy</h2>
				<CustomLink href="dodaj" color="green">
					Dodaj
				</CustomLink>
			</div>

			<div className="my-2 overflow-x-auto">
				{data ? (
					<RecipeTable content={data} />
				) : (
					<p className="italic text-center text-gray-500 dark:text-gray-400">
						Nie masz jeszcze żadnego przepisu...
					</p>
				)}
			</div>
		</>
	)
}
