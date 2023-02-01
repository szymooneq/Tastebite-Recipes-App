import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FormikHelpers, useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import Button from '../../components/UI/Button';
import { buttonSpinner } from '../../components/UI/SVG/buttonSpinner';
import { Context } from '../../lib/context/AppContext';
import { auth } from '../../lib/firebase/config';
import useDocumentTitle from '../../lib/hooks/useDocumentTitle';
import { registerSchema } from '../../lib/schemas/authSchema';
import { PasswordField, TextField } from './../../components/Forms/Fields';

function Register(): JSX.Element {
	useDocumentTitle('Rejestracja | Tastebite Recipe App');
	const { login } = useContext(Context);
	const [welcomeMessage, setWelcomeMessage] = useState(false);
	const navigate = useNavigate();

	// TODO: Add user to firestore
	const initialValues = {
		email: '',
		password: '',
		confirmPassword: ''
	};

	const onSubmit = async (
		values: typeof initialValues,
		formikHelpers: FormikHelpers<typeof initialValues>
	) => {
		await createUserWithEmailAndPassword(auth, values.email, values.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				setWelcomeMessage(true);
				login(user);
				setTimeout(() => {
					navigate('/');
				}, 5000);
			})
			.catch((error) => {
				formikHelpers.setErrors({
					email: error.message,
					password: error.message,
					confirmPassword: error.message
				});
			});
	};

	const {
		values,
		errors,
		touched,
		isValid,
		isSubmitting,
		handleBlur,
		handleChange,
		handleSubmit
	} = useFormik({
		initialValues,
		validationSchema: toFormikValidationSchema(registerSchema),
		onSubmit
	});

	return !welcomeMessage ? (
		<div className="mx-3 md:mx-auto md:w-96">
			<h2 className="p-5 text-3xl font-bold text-center dark:text-white">
				Rejestracja
			</h2>

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

				<PasswordField
					name="confirmPassword"
					label="Potwierdź hasło"
					placeholder="Potwierdź hasło..."
					value={values.confirmPassword}
					error={errors.confirmPassword}
					touched={touched.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<div className="text-center">
					<Button
						type="submit"
						color="green"
						disabled={!isValid || isSubmitting}>
						{isSubmitting ? (
							<>
								{buttonSpinner}
								Logowanie
							</>
						) : (
							<>Zaloguj</>
						)}
					</Button>
				</div>
			</form>
		</div>
	) : (
		<div className="p-3 my-5 mx-auto rounded-lg text-center">
			<div className="flex justify-center items-center">
				<InformationCircleIcon className="w-5 h-5 mr-2 text-green-700 dark:text-green-200" />
				<h3 className="text-xl font-bold text-green-700 dark:text-green-200">
					Twoje konto zostało utworzone!
				</h3>
			</div>
			<div className="my-3 font-semibold text-md text-green-700 dark:text-green-200">
				<p>
					Gratulacje! Twoje konto zostało utworzone.
					<br />
					Za 5 sekund zostaniesz automatycznie zalogowany i przekierowany na
					stronę główną...
				</p>
			</div>
		</div>
	);
}

export default Register;
