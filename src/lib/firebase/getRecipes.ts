import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { IRecipeApi } from '../interfaces/recipe'
import { IUser } from '../interfaces/user'
import { db, storage } from './config'

// TODO: api function optimization

export const getAllRecipes = async () => {
	let recipeList: IRecipeApi[] = []
	const q = query(collection(db, 'recipes'), where('status', '==', true))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		const recipe = { id: doc.id, ...doc.data() } as IRecipeApi
		recipeList.push(recipe)
	})

	return recipeList
}

export const getUserRecipes = async (userId: string) => {
	let recipeList: IRecipeApi[] = []
	const q = query(collection(db, 'recipes'), where('userId', '==', userId))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		const recipe = { id: doc.id, ...doc.data() } as IRecipeApi
		recipeList.push(recipe)
	})

	return recipeList
}

export const getRecipeData = async (id: string, navigate: (path: string) => void) => {
	const docRef = doc(db, 'recipes', id)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists() && docSnap.data().status === true) {
		document.title = `${docSnap.data().name} | Tastebite Recipes App`
		return docSnap.data() as IRecipeApi
	} else {
		navigate('/')
		console.log('No such document!')
	}
}

export const getRecipeToEdit = async (
	id: string | undefined,
	user: IUser | null,
	navigate: (path: string) => void
) => {
	if (!user || !id) return

	const docRef = doc(db, 'recipes', id)
	const docSnap = await getDoc(docRef)

	if (docSnap.exists() && docSnap.data().userId === user.uid) {
		return docSnap.data() as IRecipeApi
	}

	navigate(`/profil/przepisy`)
	console.log('No such document!')
}

export const getRecipesBySearch = async (term: string) => {
	let recipeList: IRecipeApi[] = []
	const q = query(collection(db, 'recipes'), where('status', '==', true))
	const querySnapshot = await getDocs(q)

	querySnapshot.forEach((doc) => {
		const recipe = { id: doc.id, ...doc.data() } as IRecipeApi
		recipeList.push(recipe)
	})

	return recipeList.filter((item) => item.name.toLowerCase().includes(term.toLowerCase()))
}

export const getImageUrl = (
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
					// console.log('File available at', downloadURL)
					resolve(downloadURL)
				})
			}
		)
	})
}
