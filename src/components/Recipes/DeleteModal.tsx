import { Modal } from 'flowbite-react';
import { Button } from 'flowbite-react/lib/esm/components';
import { IRecipeApi } from '../../lib/interfaces/recipe';
import { ModalData } from './RecipeTable';

interface props {
	modalData: ModalData;
	changeModalData: (status: boolean, deletingRecipe: IRecipeApi | null) => void;
	deleteFunction: (recipe: IRecipeApi, cb: () => void) => Promise<void>;
}

function DeleteModal({
	modalData,
	changeModalData,
	deleteFunction
}: props): JSX.Element {
	const handleCloseModal = () => {
		changeModalData(false, null);
	};

	return (
		<Modal
			show={modalData.status}
			size="md"
			popup={true}
			onClose={() => handleCloseModal()}>
			<Modal.Header />
			<Modal.Body>
				<div className="text-center">
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Czy chcesz usunąć <b>{modalData.deletingRecipe?.name}</b>?
					</h3>
					<div className="flex justify-center gap-4">
						<Button
							color="failure"
							onClick={() =>
								deleteFunction(modalData.deletingRecipe!, handleCloseModal)
							}>
							Tak
						</Button>
						<Button color="gray" onClick={() => handleCloseModal()}>
							Nie
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteModal;
