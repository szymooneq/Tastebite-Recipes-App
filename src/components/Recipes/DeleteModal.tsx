import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Modal, ModalProps } from 'flowbite-react'
import { FC, useEffect } from 'react'
import { IRecipeApi } from '../../lib/interfaces/recipe'
import Button from '../UI/Button/Button'
import { ModalData } from './RecipeTable'

interface props {
	modalData: ModalData
	changeModalData: (status: boolean, deletingRecipe: IRecipeApi | null) => void
	deleteFunction: (recipe: IRecipeApi, cb: () => void) => Promise<void>
}

function DeleteModal({ modalData, changeModalData, deleteFunction }: props): JSX.Element {
	const handleCloseModal = () => {
		changeModalData(false, null)
	}

	useEffect(() => {
		if (modalData.status === true) {
			document.documentElement.classList.add('overflow-hidden')
		} else {
			document.documentElement.classList.remove('overflow-hidden')
		}
	}, [modalData.status])

	return (
		<Modal
			show={modalData.status}
			size="md"
			position="center"
			popup={true}
			dismissible={true}
			onClose={() => handleCloseModal()}>
			<Modal.Header />
			<Modal.Body>
				<div className="text-center">
					<ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Czy chcesz usunąć <b>{modalData.deletingRecipe?.name}</b>?
					</h3>
					<div className="flex justify-center gap-4">
						<Button
							type="button"
							ariaLabel={`Usuń przepis ${modalData.deletingRecipe?.name}`}
							color="red"
							onClick={() => deleteFunction(modalData.deletingRecipe!, handleCloseModal)}
							disabled={false}>
							Tak
						</Button>
						<Button
							type="button"
							ariaLabel="Anuluj usuwanie"
							color="gray"
							onClick={handleCloseModal}
							disabled={false}>
							Nie
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}

export default DeleteModal
