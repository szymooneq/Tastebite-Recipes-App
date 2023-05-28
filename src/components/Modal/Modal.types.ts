import { IRecipeApi } from '@/lib/types/Recipe.types'

export interface ModalProps {
	content: { data: IRecipeApi | null; isOpen: boolean }
	setModal: (product: IRecipeApi | null, isOpen?: boolean) => void
}
