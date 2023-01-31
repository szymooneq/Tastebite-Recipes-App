import { useQuery } from '@tanstack/react-query';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { FormikHelpers } from 'formik';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from '../../../components/Forms/RecipeForm';
import Spinner from '../../../components/UI/Spinner';
import { Context } from '../../../lib/context/AppContext';
import { db } from '../../../lib/firebase/config';
import {
	getRecipeToEdit,
	uploadFileToStorage
} from '../../../lib/firebase/getRecipes';
import { roundToTwo } from '../../../lib/helpers/roundToTwo';
import useDocumentTitle from '../../../lib/hooks/useDocumentTitle';
import { IRecipe } from '../../../lib/interfaces/recipe';
import { recipeSchema } from '../../../lib/schemas/recipeSchema';

function EditRecipe(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Edycja');
	const { id } = useParams();
	const { state } = useContext(Context);
	const navigate = useNavigate();

	const { isLoading, data } = useQuery({
		queryKey: ['editRecipe', id],
		queryFn: () => getRecipeToEdit(id!, state.user!, navigate),
		cacheTime: 1,
		useErrorBoundary: true
	});

	const buttonData = {
		title: 'Zapisz przepis',
		loading: 'Zapisywanie'
	};

	const onSubmit = async (
		values: IRecipe,
		formikHelpers: FormikHelpers<IRecipe>
	) => {
		let downloadURL = values.img || null;

		if (values.file && state.user && data) {
			downloadURL = (await uploadFileToStorage(
				values.file,
				state.user?.uid,
				data?.createdAt.seconds
			)) as string;
		}

		const sendingValues = {
			name: values.name.trim().replace(/  +/g, ' '),
			description: values.description.trim().replace(/  +/g, ' '),
			status: values.status,
			img: downloadURL,
			details: {
				duration: +values.details.duration,
				level: values.details.level,
				portions: +values.details.portions
			},
			nutrions: {
				calories: roundToTwo(+values.nutrions.calories),
				protein: roundToTwo(+values.nutrions.protein),
				carbohydrates: roundToTwo(+values.nutrions.carbohydrates),
				fat: roundToTwo(+values.nutrions.fat)
			},
			ingredients: values.ingredients
				.filter((item) => item.length > 0)
				.map((item) => item.trim().replace(/  +/g, ' ')),
			steps: values.steps
				.filter((item) => item.length > 0)
				.map((item) => item.trim().replace(/  +/g, ' ')),
			editedAt: serverTimestamp()
		};

		const docRef = doc(db, 'recipes', id!);
		await updateDoc(docRef, sendingValues).catch((error) => console.log(error));
		navigate('/profil/przepisy');

		// console.log('Form values', values);
		// console.log('Formik helpers', formikHelpers);
	};

	return (
		<>
			{isLoading && <Spinner />}
			{data && (
				<RecipeForm
					buttonData={buttonData}
					initialValues={{
						name: data.name,
						description: data.description,
						img: data?.img,
						file: null,
						details: {
							duration: data?.details.duration,
							level: data?.details.level as 'easy' | 'medium' | 'hard',
							portions: data?.details.portions
						},
						nutrions: {
							calories: data?.nutrions.calories,
							protein: data?.nutrions.protein,
							carbohydrates: data?.nutrions.carbohydrates,
							fat: data?.nutrions.fat
						},
						ingredients: data?.ingredients,
						steps: data?.steps,
						status: data?.status
					}}
					validationSchema={recipeSchema}
					onSubmit={onSubmit}
				/>
			)}
		</>
	);
}

export default EditRecipe;
