import { Modal } from 'flowbite-react';
import { Button } from 'flowbite-react/lib/esm/components';
import { IRecipe } from '../../lib/interfaces/recipe';

interface props {
	modalData: {
		status: boolean;
		deletingRecipe: IRecipe | null;
	};
	changeModalData: (status: boolean, deletingRecipe: IRecipe | null) => void;
	deleteFunction: (recipe: IRecipe, cb: () => void) => Promise<void>;
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
