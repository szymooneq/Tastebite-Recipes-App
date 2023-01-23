import { PencilSquareIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { IRecipe } from '../../lib/interfaces/recipe';
import Button from '../UI/Button';
import CustomLink from '../UI/CustomLink';
import Image from '../UI/Image';
import Indicator from '../UI/Indicator';
import DeleteModal from './DeleteModal';

interface props {
	recipes: IRecipe[];
	deleteRecipe: (recipe: IRecipe, cb: () => void) => Promise<void>;
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

	return (
		<>
			<table className="mx-auto w-full text-sm text-gray-500 dark:text-gray-400">
				<thead className="uppercase text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						{['Podgląd', 'Nazwa', 'Status', 'Opcje'].map((el) => (
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
							className="text-center bg-white hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
							<td className="p-4 font-semibold text-gray-900 dark:text-white">
								<Image
									className="mx-auto block w-12 h-12 object-contain object-center"
									src={product.img}
									alt={product.name}
								/>
							</td>
							<td className="p-4 font-semibold whitespace-nowrap text-gray-900 dark:text-white">
								{product.name}
							</td>
							<td className="p-4">
								{product.status ? (
									<Indicator color="green">Aktywny</Indicator>
								) : (
									<Indicator color="red">Ukryty</Indicator>
								)}
							</td>
							<td className="p-4 font-semibold">
								<div className="flex gap-2 items-center justify-center">
									<CustomLink href={`edytuj/${product.id}`} color="blue">
										{/* Edytuj */}
										<PencilSquareIcon className="w-4 h-4" />
									</CustomLink>
									<Button
										type="button"
										disabled={false}
										color="red"
										onClick={() => changeModalData(true, product)}>
										{/* Usuń */}
										<TrashIcon className="w-4 h-4" />
									</Button>
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
