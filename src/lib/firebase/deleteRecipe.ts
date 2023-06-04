import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import { db, storage } from '@/lib/firebase/config'
import { IRecipeApi } from '@/types/Recipe.types'

const deleteRecipe = async (recipe: IRecipeApi, userId: string) => {
	const { img, id, createdAt } = recipe
	const recipeLocation = `${userId}/${createdAt?.seconds}${userId}`

	try {
		if (img) {
			const imageRef = ref(storage, recipeLocation)
			await deleteObject(imageRef)
		}

		await deleteDoc(doc(db, 'recipes', id))
	} catch (error) {
		console.log(error)
	}
}

export { deleteRecipe }
