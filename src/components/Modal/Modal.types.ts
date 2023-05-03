import { IRecipeApi } from '../../lib/interfaces/recipe'

export interface ModalProps {
	content: IRecipeApi
	setModalStatus: (product?: IRecipeApi) => void
}
