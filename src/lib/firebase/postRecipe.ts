import { Timestamp, addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './config'
import { getRecipeImageUrl } from './getRecipe'
import { filterFormValues } from '@/lib/helpers/filterFormValues'
import { IRecipe } from '@/lib/types/Recipe.types'

const postRecipe = async (values: IRecipe, userId: string) => {
	const { file } = values

	try {
		const filteredValues = filterFormValues(values)
		const createdAt = Timestamp.now()
		const img = await getRecipeImageUrl(file, userId, createdAt.seconds)

		const valuesToSend = {
			...filteredValues,
			img,
			userId,
			createdAt
		}

		await addDoc(collection(db, 'recipes'), valuesToSend)
	} catch (error) {
		console.error('Error adding document: ', error)
	}
}

const updateRecipe = async (values: IRecipe, userId: string, seconds: number, id: string) => {
	const { file } = values

	try {
		const filteredValues = filterFormValues(values)
		const editedAt = serverTimestamp()
		const img = await getRecipeImageUrl(file, userId, seconds)

		const valuesToSend = {
			...filteredValues,
			img,
			userId,
			editedAt
		}

		await updateDoc(doc(db, 'recipes', id), valuesToSend)
	} catch (error) {
		console.error('Error adding document: ', error)
	}
}

export { postRecipe, updateRecipe }
