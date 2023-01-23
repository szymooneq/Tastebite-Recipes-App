import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	query,
	where
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useCallback, useContext, useEffect, useState } from 'react';
import RecipeTable from '../../components/Recipes/RecipeTable';
import CustomLink from '../../components/UI/CustomLink';
import Spinner from '../../components/UI/Spinner';
import { Context } from '../../lib/context/AppContext';
import { db, storage } from '../../lib/firebase/config';
import useDocumentTitle from '../../lib/hooks/useDocumentTitle';
import { IRecipe } from '../../lib/interfaces/recipe';

// TODO: modal when delete document

function UserRecipes(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy');
	const { state } = useContext(Context);
	const [recipes, setRecipes] = useState<IRecipe[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchData = useCallback(async () => {
		let list: IRecipe[] = [];
		try {
			const q = query(
				collection(db, 'recipes'),
				where('userId', '==', state.user?.uid)
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				list.push({ id: doc.id, ...doc.data() });
			});
			setRecipes(list);
		} catch (ex) {
			console.log(ex.response);
		}
		setLoading(false);
	}, [state.user?.uid]);

	const deleteRecipe = async (recipe: IRecipe, cb: () => void) => {
		try {
			if (recipe.img) {
				const imageRef = ref(
					storage,
					`${state.user?.uid}/${recipe.createdAt?.seconds}${state.user?.uid}`
				);
				await deleteObject(imageRef);
			}

			await deleteDoc(doc(db, 'recipes', recipe.id));
			fetchData();
			cb();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return loading ? (
		<Spinner />
	) : (
		<>
			<CustomLink href="dodaj" color="green">
				Dodaj nowy przepis
			</CustomLink>
			<div className="my-2 overflow-x-auto">
				{recipes ? (
					<RecipeTable recipes={recipes} deleteRecipe={deleteRecipe} />
				) : (
					<p className="italic text-center text-gray-500 dark:text-gray-400">
						Nie masz jeszcze żadnego przepisu...
					</p>
				)}
			</div>
		</>
	);
}

export default UserRecipes;
