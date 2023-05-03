import { signInWithEmailAndPassword } from 'firebase/auth'
import { FormikHelpers, useFormik } from 'formik'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import Button from '../../components/UI/Button/Button'
import * as icon from '../../assets/svg'
import { Context } from '../../lib/context/AppContext'
import { auth } from '../../lib/firebase/config'
import useDocumentTitle from '../../lib/hooks/useDocumentTitle'
import { loginSchema } from '../../lib/schemas/authSchema'
import { PasswordField, TextField } from './../../components/Forms/Fields'

export default function Login(): JSX.Element {
	useDocumentTitle('Logowanie | Tastebite Recipe App')
	const { login } = useContext(Context)
	const navigate = useNavigate()

	const initialValues = {
		email: '',
		password: ''
	}

	const onSubmit = async (
		values: typeof initialValues,
		formikHelpers: FormikHelpers<typeof initialValues>
	) => {
		await signInWithEmailAndPassword(auth, values.email, values.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				login(user)
				navigate('/')
			})
			.catch((error) => {
				formikHelpers.setErrors({
					email: error.message,
					password: error.message
				})
			})
	}

	const { values, errors, touched, isValid, isSubmitting, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: toFormikValidationSchema(loginSchema),
			onSubmit
		})

	return (
		<div className="mx-3 md:mx-auto md:w-96">
			<h2 className="p-5 text-3xl font-bold text-center dark:text-white">Logowanie</h2>

			<form onSubmit={handleSubmit}>
				<TextField
					name="email"
					label="Email"
					placeholder="Podaj adres e-mail..."
					value={values.email}
					error={errors.email}
					touched={touched.email}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<PasswordField
					name="password"
					label="Hasło"
					placeholder="Podaj hasło..."
					value={values.password}
					error={errors.password}
					touched={touched.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<div className="text-center">
					<Button type="submit" color="green" disabled={!isValid || isSubmitting}>
						{isSubmitting ? (
							<>
								{icon.buttonSpinner}
								Logowanie
							</>
						) : (
							<>Zaloguj</>
						)}
					</Button>
				</div>
			</form>
		</div>
	)
}
