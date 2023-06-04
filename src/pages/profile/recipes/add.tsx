import { useNavigate } from 'react-router-dom'
import { postRecipe } from '@/lib/firebase/postRecipe'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { IRecipe } from '@/types/Recipe.types'

import RecipeForm from '@/components/Forms/RecipeForm'

const initialValues = {
	name: '',
	description: '',
	img: '',
	file: null,
	details: {
		duration: 0,
		level: '' as 'easy' | 'medium' | 'hard',
		portions: 0
	},
	nutrions: {
		calories: 0,
		protein: 0,
		carbohydrates: 0,
		fat: 0
	},
	ingredients: [''],
	steps: [''],
	status: false
}

export default function AddRecipePage(): JSX.Element {
	useDocumentTitle('Profil | Moje przepisy | Nowy')
	const { user } = useAuth()
	const navigate = useNavigate()

	if (!user) {
		navigate('/')
		return <></>
	}

	// TODO: error handling from the API
	const onSubmit = async (values: IRecipe) => {
		await postRecipe(values, user?.uid)
		navigate('/profile/recipes')
	}

	return <RecipeForm initialValues={initialValues} onSubmit={onSubmit} />
}
