import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { IRecipeApi } from '../interfaces/Recipe.types'
import { db, storage } from './config'

const getRecipes = async (userId?: string) => {
	let recipes: IRecipeApi[] = []

	const condition = userId ? where('userId', '==', userId) : where('status', '==', true)

	const q = query(collection(db, 'recipes'), condition)
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		const recipe = { id: doc.id, ...doc.data() } as IRecipeApi
		recipes.push(recipe)
	})

	return recipes
}

const getRecipeData = async (id: string, uid?: string) => {
	const docRef = doc(db, 'recipes', id)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists()) {
		const data = docSnap.data() as IRecipeApi
		const { userId, status } = data

		if (uid && uid === userId) {
			return data
		}

		if (status) {
			return data
		}
	}

	return null
}

const getRecipeImageUrl = (
	file: Blob | null,
	userId: string | undefined,
	timeStamp: number | undefined
) => {
	if (!file || !userId || !timeStamp) return null

	return new Promise<string>((resolve) => {
		const storageRef = ref(storage, `${userId}/${timeStamp}${userId}`)
		const uploadTask = uploadBytesResumable(storageRef, file)

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				console.log('Upload is ' + progress + '% done')
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused')
						break
					case 'running':
						console.log('Upload is running')
						break
					default:
						break
				}
			},
			(error) => {
				switch (error.code) {
					case 'storage/unauthorized':
						break
					case 'storage/canceled':
						break
					case 'storage/unknown':
						break
					default:
						break
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					console.log('File available at', downloadURL)
					resolve(downloadURL)
				})
			}
		)
	})
}

export { getRecipes, getRecipeData, getRecipeImageUrl }
