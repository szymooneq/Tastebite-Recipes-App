import { useEffect } from 'react'
import { Modal as FlowbiteModal } from 'flowbite-react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'
import { deleteRecipe } from '@/lib/firebase/deleteRecipe'
import { toggleScrolling } from '@/lib/helpers/toggleScrolling'
import { useAuth } from '@/hooks/useAuth'
import { ModalProps } from './Modal.types'

import Button from '@/components/UI/Button'

// TODO: modal refractoring, remove Flowbite Modal
const Modal = ({ content, setModal }: ModalProps): JSX.Element => {
	const { user } = useAuth()
	const { data, isOpen } = content

	const handleDelete = () => {
		if (user && data) deleteRecipe(data, user?.uid)
		setModal(null)
	}

	const handleCloseModal = () => {
		setModal(null)
	}

	useEffect(() => {
		toggleScrolling(isOpen)
	}, [isOpen])

	return (
		<FlowbiteModal
			show={isOpen}
			size="md"
			position="center"
			popup={true}
			dismissible
			onClose={handleCloseModal}>
			<FlowbiteModal.Header />
			<FlowbiteModal.Body>
				<div className="text-center">
					<ExclamationCircleIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
					<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
						Czy chcesz usunąć <b>{data ? data.name : null}</b>?
					</h3>
					<div className="flex justify-center gap-4">
						<Button type="button" color="red" onClick={handleDelete}>
							Tak
						</Button>
						<Button type="button" color="gray" onClick={handleCloseModal}>
							Nie
						</Button>
					</div>
				</div>
			</FlowbiteModal.Body>
		</FlowbiteModal>
	)
}

export default Modal
