import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { Modal as FlowbiteModal } from 'flowbite-react'
import { useEffect } from 'react'
import Button from '../UI/Button/Button'
import { ModalProps } from './Modal.types'
import { toggleScrolling } from '../../lib/helpers/toggleScrolling'
import { deleteRecipe } from '../../lib/firebase/deleteRecipe'
import { useAuth } from '../../lib/hooks/useAuth'

const Modal = ({ content, setModalStatus }: ModalProps): JSX.Element => {
	const { user } = useAuth()
	const { name } = content

	const handleDelete = () => {
		if (user) deleteRecipe(content, user?.uid)
		setModalStatus()
	}

	const handleCloseModal = () => {
		setModalStatus()
	}

	useEffect(() => {
		toggleScrolling(true)
	}, [])

	return (
		<FlowbiteModal
			show={true}
			size="md"
			position="center"
			popup={true}
			dismissible={true}
			onClose={() => handleCloseModal()}>
			<FlowbiteModal.Header />
			<FlowbiteModal.Body>
				<div className="text-center">
					<ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Czy chcesz usunąć <b>{name}</b>?
					</h3>
					<div className="flex justify-center gap-4">
						<Button
							type="button"
							ariaLabel={`Usuń przepis ${name}`}
							color="red"
							onClick={() => handleDelete()}
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
			</FlowbiteModal.Body>
		</FlowbiteModal>
	)
}

export default Modal
