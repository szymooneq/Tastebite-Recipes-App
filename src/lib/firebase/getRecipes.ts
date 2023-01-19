import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { IRecipe } from '../interfaces/recipe';
import { IUser } from '../interfaces/user';
import { db, storage } from './config';

// TODO: api types

export const getAllRecipes = async () => {
	let recipeList: IRecipe[] = [];
	const q = query(collection(db, 'recipes'), where('status', '==', true));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		const recipe = { id: doc.id, ...doc.data() } as IRecipe;
		recipeList.push(recipe);
	});

	return recipeList;
};

export const getRecipeView = async (id: string) => {
	let recipe;
	const docRef = doc(db, 'recipes', id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		recipe = docSnap.data();
	} else {
		console.log('No such document!');
	}

	return recipe ? recipe : '404';
};

export const getEditRecipe = async (id: string, user: IUser) => {
	let recipe;
	const docRef = doc(db, 'recipes', id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists() && docSnap.data().userId === user.uid) {
		recipe = docSnap.data();
	} else {
		console.log('No such document!');
	}

	return recipe ? recipe : '404';
};

export const getSearchingRecipes = async (term: string) => {
	let recipeList: IRecipe[] = [];
	const q = query(collection(db, 'recipes'), where('status', '==', true));
	const querySnapshot = await getDocs(q);

	querySnapshot.forEach((doc) => {
		const recipe = { id: doc.id, ...doc.data() } as IRecipe;
		recipeList.push(recipe);
	});

	return term
		? recipeList.filter((item) =>
				item.name.toLowerCase().includes(term.toLowerCase())
		  )
		: null;
};

export const uploadFileToStorage = (
	file: Blob,
	recipeOwnerId: string,
	timeStamp: number
) => {
	return new Promise((resolve) => {
		const storageName = timeStamp + recipeOwnerId;
		const storageRef = ref(storage, `${recipeOwnerId}/${storageName}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			'state_changed',
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
					default:
						break;
				}
			},
			(error) => {
				switch (error.code) {
					case 'storage/unauthorized':
						break;
					case 'storage/canceled':
						break;
					case 'storage/unknown':
						break;
					default:
						break;
				}
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					// console.log('File available at', downloadURL)
					resolve(downloadURL);
				});
			}
		);
	});
};
