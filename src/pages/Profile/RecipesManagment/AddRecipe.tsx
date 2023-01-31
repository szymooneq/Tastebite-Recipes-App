import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { FormikHelpers } from 'formik';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from '../../../components/Forms/RecipeForm';
import { Context } from '../../../lib/context/AppContext';
import { db } from '../../../lib/firebase/config';
import { uploadFileToStorage } from '../../../lib/firebase/getRecipes';
import { roundToTwo } from '../../../lib/helpers/roundToTwo';
import useDocumentTitle from '../../../lib/hooks/useDocumentTitle';
import { IRecipe } from '../../../lib/interfaces/recipe';
import { recipeSchema } from '../../../lib/schemas/zodSchema';

function AddRecipe(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Nowy');
	const { state } = useContext(Context);
	const navigate = useNavigate();

	const buttonData = {
		title: 'Dodaj przepis',
		loading: 'Dodawanie'
	};

	// TODO: add react query mutations

	const onSubmit = async (
		values: IRecipe,
		formikHelpers: FormikHelpers<IRecipe>
	) => {
		const timeStamp = Timestamp.now();
		let downloadURL;

		try {
			if (values.file && state.user) {
				downloadURL = await uploadFileToStorage(
					values.file,
					state.user?.uid,
					timeStamp.seconds
				);
			}

			const sendingValues = {
				name: values.name.trim().replace(/  +/g, ' '),
				description: values.description.trim().replace(/  +/g, ' '),
				status: values.status,
				img: downloadURL ? downloadURL : null,
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
				userId: state.user?.uid,
				createdAt: timeStamp
			};

			await addDoc(collection(db, 'recipes'), sendingValues);
			navigate('/profil/przepisy');
		} catch (error) {
			console.error('Error adding document: ', error);
		}
	};

	return (
		<RecipeForm
			buttonData={buttonData}
			initialValues={{
				name: '',
				description: '',
				img: '',
				file: null,
				details: {
					duration: 0,
					level: '' as 'easy' | 'medium' | 'hard',
					portions: 0
				},
				nutrions: {
					calories: 0,
					protein: 0,
					carbohydrates: 0,
					fat: 0
				},
				ingredients: [''],
				steps: [''],
				status: false
			}}
			validationSchema={recipeSchema}
			onSubmit={onSubmit}
		/>
	);
}

export default AddRecipe;
