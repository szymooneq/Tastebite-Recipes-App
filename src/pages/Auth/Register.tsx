import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordField from '../../components/Forms/Fields/PasswordField';
import TextField from '../../components/Forms/Fields/TextField';
import Alert from '../../components/UI/Alert';
import Button from '../../components/UI/Button';
import { Context } from '../../lib/context/AppContext';
import { auth } from '../../lib/firebase/config';
import useDocumentTitle from '../../lib/hooks/useDocumentTitle';
import { registerSchema } from '../../lib/schemas/schemas';

function Register(): JSX.Element {
	useDocumentTitle('Rejestracja | Tastebite Recipe App');
	const { login } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [registered, setRegistered] = useState(false);
	const navigate = useNavigate();

	// TODO: Add user to firestore

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				email: '',
				password: '',
				confirmPassword: ''
			},
			validationSchema: registerSchema,
			onSubmit: async (values) => {
				setLoading(true);
				createUserWithEmailAndPassword(auth, values.email, values.password)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						setRegistered(true);
						login(user);
						setTimeout(() => {
							navigate('/');
						}, 5000);
					})
					.catch((error) => {
						// console.log(error.code)
						setError(error.message);
						setLoading(false);
					});
			}
		});

	return !registered ? (
		<div className="mx-7 md:mx-auto md:w-96">
			<h2 className="p-5 text-3xl font-bold text-center dark:text-white">
				Rejestracja
			</h2>
			{error && <Alert color="red" message={error} />}

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
					<Button type="submit" color="green" disabled={loading}>
						{!loading ? 'Zarejestruj' : 'Rejestrowanie'}
					</Button>
				</div>
			</form>
		</div>
	) : (
		<div className="p-3 my-5 mx-auto rounded-lg">
			<div className="flex justify-center items-center">
				<InformationCircleIcon className="w-5 h-5 mr-2 text-green-700 dark:text-green-200" />
				<h3 className="text-2xl font-bold text-green-700 dark:text-green-200">
					Twoje konto zostało utworzone!
				</h3>
			</div>
			<div className="my-3 text-center font-semibold text-md text-green-700 dark:text-green-200">
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
