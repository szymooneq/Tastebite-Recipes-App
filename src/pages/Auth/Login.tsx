import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../../components/UI/Alert';
import Button from '../../components/UI/Button';
import { Context } from '../../lib/context/AppContext';
import { auth } from '../../lib/firebase/config';
import useDocumentTitle from '../../lib/hooks/useDocumentTitle';
import { loginSchema } from '../../lib/schemas/schemas';
import { PasswordField, TextField } from './../../components/Forms/Fields';

function Login(): JSX.Element {
	useDocumentTitle('Logowanie | Tastebite Recipe App');
	const { login } = useContext(Context);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				email: '',
				password: ''
			},
			validationSchema: loginSchema,
			onSubmit: async (values) => {
				setLoading(true);
				signInWithEmailAndPassword(auth, values.email, values.password)
					.then((userCredential) => {
						// Signed in
						const user = userCredential.user;
						login(user);
						navigate('/');
					})
					.catch((error) => {
						// console.log(error.code)
						setError(error.message);
						setLoading(false);
					});
			}
		});

	return (
		<div className="mx-7 md:mx-auto md:w-96">
			<h2 className="p-5 text-3xl font-bold text-center dark:text-white">
				Logowanie
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

				<div className="text-center">
					<Button type="submit" color="green" disabled={loading}>
						{!loading ? 'Zaloguj' : 'Logowanie'}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default Login;
