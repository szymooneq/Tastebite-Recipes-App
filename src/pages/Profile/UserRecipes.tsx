import { useQuery } from '@tanstack/react-query'
import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { useContext } from 'react'
import RecipeTable from '../../components/Recipes/RecipeTable'
import CustomLink from '../../components/UI/CustomLink/CustomLink'
import Spinner from '../../components/UI/LoadingSpinner/LoadingSpinner'
import { Context } from '../../lib/context/AppContext'
import { db, storage } from '../../lib/firebase/config'
import { getUserRecipes } from '../../lib/firebase/getRecipes'
import useDocumentTitle from '../../lib/hooks/useDocumentTitle'
import { IRecipeApi } from '../../lib/interfaces/recipe'

function UserRecipes(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy')
	const { state } = useContext(Context)

	const { isLoading, data, refetch } = useQuery({
		queryKey: ['userRecipes', state.user?.uid],
		queryFn: () => {
			if (state.user) return getUserRecipes(state.user?.uid)
		},
		useErrorBoundary: true
	})

	const deleteRecipe = async (recipe: IRecipeApi, cb: () => void) => {
		try {
			if (recipe.img) {
				const imageRef = ref(
					storage,
					`${state.user?.uid}/${recipe.createdAt?.seconds}${state.user?.uid}`
				)
				await deleteObject(imageRef)
			}

			await deleteDoc(doc(db, 'recipes', recipe.id))
			refetch()
			cb()
		} catch (error) {
			console.log(error)
		}
	}

	if (isLoading) return <Spinner />

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
					<RecipeTable recipes={data} deleteRecipe={deleteRecipe} />
				) : (
					<p className="italic text-center text-gray-500 dark:text-gray-400">
						Nie masz jeszcze żadnego przepisu...
					</p>
				)}
			</div>
		</>
	)
}

export default UserRecipes
