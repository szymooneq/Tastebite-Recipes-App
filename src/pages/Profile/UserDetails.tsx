import { useFormik } from 'formik';
import { useState } from 'react';
import PasswordField from '../../components/Forms/Fields/PasswordField';
import TextField from '../../components/Forms/Fields/TextField';
import Alerts from '../../components/UI/Alert';
import useDocumentTitle from '../../lib/hooks/useDocumentTitle';
import { registerSchema } from '../../lib/schemas/schemas';

// TODO: profile update information

function UserDetails(): JSX.Element {
	useDocumentTitle('Profil | Szczegóły profilu');
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(null);

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				email: '',
				password: '',
				confirmPassword: ''
			},
			validationSchema: registerSchema,
			onSubmit: async (values) => {}
		});

	return (
		<div className="mx-7 md:mx-auto md:w-96">
			<p className="text-black italic dark:text-white">Currently unavailable</p>
			<div className="relative">
				<label
					htmlFor="floating_outlined"
					className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
					Floating outlined
				</label>
				<input
					type="text"
					id="floating_outlined"
					className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
					placeholder=""
				/>
			</div>
			{/* {message && <Alerts message={message.info} type={message.theme} />}

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
					label="Password"
					placeholder="Podaj hasło..."
					value={values.password}
					error={errors.password}
					touched={touched.password}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<PasswordField
					name="confirmPassword"
					label="Potwierdź nowe hasło"
					placeholder="Potwierdź hasło..."
					value={values.confirmPassword}
					error={errors.confirmPassword}
					touched={touched.confirmPassword}
					onChange={handleChange}
					onBlur={handleBlur}
				/>

				<div className="text-center">
					<LoadingButton
						disabled={
							errors?.email || errors?.password || errors?.confirmPassword
								? true
								: false
						}
						loading={loading}
						loadingMessage="Aktualizacje...">
						Zaktualizuj dane
					</LoadingButton>
				</div>
			</form> */}
		</div>
	);
}

export default UserDetails;
