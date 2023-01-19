import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../../../components/Forms/RecipeForm';
import { Context } from '../../../lib/context/AppContext';
import { db } from '../../../lib/firebase/config';
import { uploadFileToStorage } from '../../../lib/firebase/getRecipes';
import useDocumentTitle from '../../../lib/hooks/useDocumentTitle';

function AddRecipe(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Nowy');
	const { state } = useContext(Context);
	const navigate = useNavigate();

	const addRecipeToDatabase = async (form) => {
		const timeStamp = Timestamp.now();
		let data = { ...form, userId: state.user?.uid, createdAt: timeStamp };

		try {
			if (data.file) {
				const downloadURL = await uploadFileToStorage(
					data.file,
					state.user?.uid,
					timeStamp.seconds
				);
				data = { ...data, img: downloadURL };
			}

			const { file, ...restParams } = data;

			const res = await addDoc(collection(db, 'recipes'), restParams);
			navigate('/profil/przepisy');
		} catch (error) {
			// TODO: alert with error while adding data to database
			console.error('Error adding document: ', error);
		}
	};

	return (
		<RecipeForm buttonText="Dodaj przepis" onSubmit={addRecipeToDatabase} />
	);
}

export default AddRecipe;
