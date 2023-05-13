import { IRecipeApi } from '../../lib/interfaces/Recipe.types'

export interface ModalProps {
	content: IRecipeApi
	setModalStatus: (product?: IRecipeApi) => void
}
