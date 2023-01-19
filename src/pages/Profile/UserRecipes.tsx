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
import { Link } from 'react-router-dom';
import LoadingIcon from '../../components/UI/LoadingIcon';
import { Context } from '../../lib/context/AppContext';
import { db, storage } from '../../lib/firebase/config';
import useDocumentTitle from '../../lib/hooks/useDocumentTitle';
import { Recipe } from '../../lib/interfaces/recipe';

// TODO: modal when delete document

function UserRecipes(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy');
	const { state } = useContext(Context);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const [loading, setLoading] = useState(true);
	const [modal, setModal] = useState({
		status: false,
		data: {}
	});

	const fetchData = useCallback(async () => {
		let list: Recipe[] = [];
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

	const deleteHandler = async (recipe: Recipe) => {
		try {
			if (recipe.img) {
				const imageRef = ref(
					storage,
					`${state.user?.uid}/${recipe.createdAt.seconds}${state.user?.uid}`
				);
				await deleteObject(imageRef);
			}

			await deleteDoc(doc(db, 'recipes', recipe.id));
			fetchData();
		} catch (error) {
			console.log(error);
		}
	};

	/* const requestDelete = (product) => {
		setModal({
			status: true,
			data: product
		});
	};

	const closeModal = () => {
		setModal({ status: false, data: {} });
	}; */

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return loading ? (
		<LoadingIcon />
	) : (
		<>
			<div className="my-2 overflow-x-auto">
				{recipes ? (
					<table className="mx-auto w-full text-sm text-gray-500 dark:text-gray-400">
						<thead className="uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th className="py-3 px-6">Zdjęcie</th>
								<th className="py-3 px-6">Nazwa</th>
								<th className="py-3 px-6">Status</th>
								<th className="py-3 px-6">Opcje</th>
							</tr>
						</thead>
						<tbody>
							{recipes.map((product, id) => (
								<tr
									key={id}
									className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
									<td className="p-4 font-semibold text-gray-900 dark:text-white">
										<img
											className="w-40 h-24 rounded object-contain object-center"
											src={product.img}
											alt={product.name}
										/>
									</td>
									<td className="p-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white">
										{product.name}
									</td>
									<td className="p-4">
										{product.status ? (
											<span className="mr-2 px-2.5 py-0.5 text-xs font-semibold rounded-full text-green-800 bg-green-100 dark:bg-green-200 dark:text-green-900">
												Aktywny
											</span>
										) : (
											<span className="mr-2 px-2.5 py-0.5 text-xs font-semibold rounded-full text-red-800 bg-red-100 dark:bg-red-200 dark:text-red-900">
												Ukryty
											</span>
										)}
									</td>
									<td className="p-4 flex gap-1 justify-center items-center font-semibold">
										<Link
											to={`edytuj/${product.id}`}
											className="text-blue-600 dark:text-blue-500 hover:underline">
											Edytuj
										</Link>
										<button
											onClick={() => deleteHandler(product)}
											className="text-red-600 dark:text-red-500 hover:underline">
											Usuń
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="italic text-gray-500 dark:text-gray-400">
						Nie masz jeszcze żadnego przepisu...
					</p>
				)}
			</div>
			<Link
				to={'dodaj'}
				className="mx-auto mt-4 p-2.5 block w-max text-sm font-bold rounded-lg focus:ring-4 focus:outline-none text-white bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 focus:ring-green-200 dark:focus:ring-green-800">
				Nowy przepis
			</Link>
		</>
	);
}

export default UserRecipes;
