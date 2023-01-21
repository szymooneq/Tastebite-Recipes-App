import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IRecipe } from '../../lib/interfaces/recipe';
import Image from '../UI/Image';
import DeleteModal from './DeleteModal';

interface props {
	recipes: IRecipe[];
	deleteRecipe: (recipe: IRecipe) => Promise<void>;
}

export interface ModalData {
	status: boolean;
	deletingRecipe: IRecipe | null;
}

function RecipeTable({ recipes, deleteRecipe }: props): JSX.Element {
	const [modalData, setModalData] = useState<ModalData>({
		status: false,
		deletingRecipe: null
	});

	const changeModalData = (status: boolean, deletingRecipe: IRecipe | null) => {
		setModalData({ status, deletingRecipe });
	};

	const activeStatusColor =
		'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
	const inActiveStatusColor =
		'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';

	return (
		<>
			<table className="mx-auto w-full text-sm text-gray-500 dark:text-gray-400">
				<thead className="uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{['Zdjęcie', 'Nazwa', 'Status', 'Opcje'].map((el) => (
							<th key={el} className="py-3 px-6">
								{el}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{recipes.map((product) => (
						<tr
							key={product.id}
							className="text-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600">
							<td className="p-4 font-semibold text-gray-900 dark:text-white">
								<Image
									className="mx-auto block w-12 h-12 object-contain object-center"
									src={product.img ? product.img : ''}
									alt={product.name}
								/>
							</td>
							<td className="p-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white">
								{product.name}
							</td>
							<td className="p-4">
								{product.status ? (
									<span
										className={`mr-2 px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded-full ${activeStatusColor}`}>
										<span className="w-2 h-2 mr-1 bg-green-500 rounded-full"></span>
										Aktywny
									</span>
								) : (
									<span
										className={`mr-2 px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded-full ${inActiveStatusColor}`}>
										<span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
										Ukryty
									</span>
								)}
							</td>
							<td className="p-4 font-semibold">
								<div className="flex gap-2 items-center justify-center">
									<Link
										to={`edytuj/${product.id}`}
										className="text-blue-600 dark:text-blue-500 hover:underline">
										Edytuj
									</Link>
									<button
										onClick={() => changeModalData(true, product)}
										className="text-red-600 dark:text-red-500 hover:underline">
										Usuń
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<DeleteModal
				modalData={modalData}
				changeModalData={changeModalData}
				deleteFunction={deleteRecipe}
			/>
		</>
	);
}

export default RecipeTable;
