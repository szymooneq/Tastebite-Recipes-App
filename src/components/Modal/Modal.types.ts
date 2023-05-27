import { IRecipeApi } from '../../lib/interfaces/Recipe.types'

export interface ModalProps {
	content: { data: IRecipeApi | null; isOpen: boolean }
	setModal: (product: IRecipeApi | null, isOpen?: boolean) => void
}
