import {
	Timestamp,
	addDoc,
	collection,
	serverTimestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { IRecipe } from '../interfaces/recipe';
import { IUser } from '../interfaces/user';
import { getEditRecipe, uploadFileToStorage } from './getRecipes';

export const addRecipeToDatabase = async (
	formValues: IRecipe,
	loggedUser: IUser,
	navigate: (path: string) => void
) => {
	const timeStamp = Timestamp.now();
	let data = { ...formValues, userId: loggedUser.uid, createdAt: timeStamp };

	try {
		if (data.file) {
			const downloadURL = (await uploadFileToStorage(
				data.file,
				loggedUser.uid,
				timeStamp.seconds
			)) as string;
			data = { ...data, img: downloadURL };
		}

		const { file, ...restParams } = data;

		await addDoc(collection(db, 'recipes'), restParams);
		navigate('/profil/przepisy');
	} catch (error) {
		// TODO: alert with error while adding data to database
		console.error('Error adding document: ', error);
	}
};

const editExistingRecipe = async (
	formValues: IRecipe,
	loggedUser: IUser,
	navigate: (path: string) => void
) => {
	let newData = { ...formValues, lastEdit: serverTimestamp() };
	const res = await getEditRecipe(id, loggedUser);

	if (newData.file) {
		const downloadURL = await uploadFileToStorage(
			newData.file,
			loggedUser.uid,
			data.createdAt.seconds
		).catch((error) => console.log(error));
		newData = { ...newData, img: downloadURL };
	}

	const { file, createdAt, userId, ...restParams } = newData;
	const docRef = doc(db, 'recipes', id);
	await updateDoc(docRef, restParams).catch((error) => console.log(error));
	navigate('/profil/przepisy');
};
