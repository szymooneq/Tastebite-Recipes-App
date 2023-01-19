import { useFormik } from 'formik';
import { useState } from 'react';
import PasswordField from '../../components/Forms/Fields/PasswordField';
import TextField from '../../components/Forms/Fields/TextField';
import Alerts from '../../components/UI/Alerts';
import LoadingButton from '../../components/UI/LoadingButton/LoadingButton';
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
			{message && <Alerts message={message.info} type={message.theme} />}

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
			</form>
		</div>
	);
}

export default UserDetails;
