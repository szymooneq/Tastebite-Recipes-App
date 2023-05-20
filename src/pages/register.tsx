import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { auth } from '../lib/firebase/config'
import RegisterForm from '../components/Forms/RegisterForm/RegisterForm'
import { useAuth } from '../lib/hooks/useAuth'
import { useDocumentTitle } from '../lib/hooks/useDocumentTitle'
import { registerSchema } from '../lib/schemas'
import SuccessMessage from '../components/Layout/SuccessMessage/SuccessMessage'

const initialValues = {
	email: '',
	password: '',
	confirmPassword: ''
}

// TODO: Add user to firestore
export default function RegisterPage(): JSX.Element {
	const [isRegistered, setIsRegistered] = useState(false)
	useDocumentTitle('Rejestracja | Tastebite Recipe App')
	const { loginUser } = useAuth()
	const navigate = useNavigate()

	const formik = useFormik({
		initialValues,
		validationSchema: toFormikValidationSchema(registerSchema),
		onSubmit: (values, formikHelpers) => {
			const { email, password } = values
			const { setErrors } = formikHelpers

			createUserWithEmailAndPassword(auth, email, password)
				.then((userCredentials) => {
					const { user } = userCredentials
					loginUser(user)
					setIsRegistered(true)

					setTimeout(() => navigate('/'), 5000)
				})
				.catch((error) =>
					setErrors({
						email: error.message,
						password: error.message,
						confirmPassword: error.message
					})
				)
		}
	})

	return !isRegistered ? <RegisterForm control={formik} /> : <SuccessMessage />
}
