import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../../../components/Forms/RecipeForm';
import { Context } from '../../../lib/context/AppContext';
import { db } from '../../../lib/firebase/config';
import { uploadFileToStorage } from '../../../lib/firebase/getRecipes';
import useDocumentTitle from '../../../lib/hooks/useDocumentTitle';
import { IRecipe } from '../../../lib/interfaces/recipe';

function AddRecipe(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Nowy');
	const { state } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// TODO: add react query mutations

	const addRecipeToDatabase = async (formValues: IRecipe) => {
		setLoading(true);
		const timeStamp = Timestamp.now();
		let data = { ...formValues, userId: state.user?.uid, createdAt: timeStamp };

		try {
			if (data.file && state.user) {
				const downloadURL = (await uploadFileToStorage(
					data.file,
					state.user?.uid,
					timeStamp.seconds
				)) as string;
				data = { ...data, img: downloadURL };
			}

			const { file, ...restParams } = data;

			await addDoc(collection(db, 'recipes'), restParams);
			navigate('/profil/przepisy');
		} catch (error) {
			console.error('Error adding document: ', error);
		}
		setLoading(false);
	};

	return (
		<RecipeForm
			loading={loading}
			buttonText="Dodaj przepis"
			submitForm={addRecipeToDatabase}
		/>
	);
}

export default AddRecipe;
