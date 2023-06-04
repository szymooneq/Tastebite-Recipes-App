import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase/config'
import { loginSchema } from '@/lib/schemas'
import { useAuth } from '@/hooks/useAuth'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

import LoginForm from '@/components/Forms/LoginForm'

const initialValues = {
	email: '',
	password: ''
}

export default function LoginPage(): JSX.Element {
	useDocumentTitle('Logowanie | Tastebite Recipe App')
	const { loginUser } = useAuth()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues,
		validationSchema: toFormikValidationSchema(loginSchema),
		onSubmit: async (values, formikHelpers) => {
			const { email, password } = values
			const { setErrors } = formikHelpers

			signInWithEmailAndPassword(auth, email, password)
				.then((userCredentials) => {
					const { user } = userCredentials
					loginUser(user)
					navigate('/')
				})
				.catch((error) => setErrors({ email: error.message, password: error.message }))
		}
	})

	return <LoginForm control={formik} />
}
