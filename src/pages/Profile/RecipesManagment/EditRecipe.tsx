import { useQuery } from '@tanstack/react-query';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../../../components/Forms/RecipeForm';
import Spinner from '../../../components/UI/Spinner';
import { Context } from '../../../lib/context/AppContext';
import { db } from '../../../lib/firebase/config';
import {
	getEditRecipe,
	uploadFileToStorage
} from '../../../lib/firebase/getRecipes';
import useDocumentTitle from '../../../lib/hooks/useDocumentTitle';
import { IRecipe } from '../../../lib/interfaces/recipe';

function EditRecipe(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Edycja');
	const { id } = useParams();
	const { state } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { isLoading, data } = useQuery({
		queryKey: ['editRecipe', id],
		queryFn: () => getEditRecipe(id!, state.user!, navigate),
		cacheTime: 1,
		useErrorBoundary: true
	});

	const editExistingRecipe = async (formValues: IRecipe) => {
		setLoading(true);
		let newData = { ...formValues, lastEdit: serverTimestamp() };

		if (newData.file && state.user && data) {
			const downloadURL = (await uploadFileToStorage(
				newData.file,
				state.user?.uid,
				data?.createdAt.seconds
			)) as string;
			newData = { ...newData, img: downloadURL };
		}

		const { file, createdAt, userId, ...restParams } = newData;
		const docRef = doc(db, 'recipes', id!);
		await updateDoc(docRef, restParams).catch((error) => console.log(error));
		navigate('/profil/przepisy');
		setLoading(false);
	};

	if (isLoading) return <Spinner />;

	return (
		<RecipeForm
			recipe={data}
			loading={loading}
			buttonText="Zaaktualizuj przepis"
			submitForm={editExistingRecipe}
		/>
	);
}

export default EditRecipe;
