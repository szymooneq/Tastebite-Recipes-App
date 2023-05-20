import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import RecipeForm from '../../../components/Forms/RecipeForm/RecipeForm'
import { IRecipe } from '../../../lib/interfaces/Recipe.types'
import { useAuth } from '../../../lib/hooks/useAuth'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { postRecipe } from '../../../lib/firebase/postRecipe'
import { useDocumentTitle } from '../../../lib/hooks/useDocumentTitle'
import { recipeSchema } from '../../../lib/schemas'

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

	const formik = useFormik({
		initialValues,
		validationSchema: toFormikValidationSchema(recipeSchema),
		onSubmit: (values: IRecipe) => {
			postRecipe(values, user?.uid)
			navigate('/profil/przepisy')
		}
	})

	return <RecipeForm control={formik} />
}
