import { useQuery } from '@tanstack/react-query';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../../../components/Forms/RecipeForm';
import LoadingIcon from '../../../components/UI/LoadingIcon';
import { Context } from '../../../lib/context/AppContext';
import { db } from '../../../lib/firebase/config';
import {
	getEditRecipe,
	uploadFileToStorage
} from '../../../lib/firebase/getRecipes';
import useDocumentTitle from '../../../lib/hooks/useDocumentTitle';

function EditRecipe(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Edycja');
	const { id } = useParams();
	const { state } = useContext(Context);
	const navigate = useNavigate();

	const { isLoading, error, data } = useQuery({
		queryKey: ['editRecipe', id],
		queryFn: () => getEditRecipe(id, state.user),
		cacheTime: 1
	});

	const editExistingRecipe = async (form) => {
		let newData = { ...form, lastEdit: serverTimestamp() };

		if (newData.file) {
			const downloadURL = await uploadFileToStorage(
				newData.file,
				state.user?.uid,
				data.createdAt.seconds
			).catch((error) => console.log(error));
			newData = { ...newData, img: downloadURL };
		}

		const { file, createdAt, userId, ...restParams } = newData;
		const docRef = doc(db, 'recipes', id);
		await updateDoc(docRef, restParams).catch((error) => console.log(error));
		navigate('/profil/przepisy');
	};

	if (isLoading) return <LoadingIcon />;

	if (error) return 'An error has occurred: ' + error.message;

	return data !== '404' ? (
		<RecipeForm
			recipe={data}
			buttonText="Zaaktualizuj przepis"
			onSubmit={editExistingRecipe}
		/>
	) : (
		<Navigate to="/profil/przepisy" />
	);
}

export default EditRecipe;
