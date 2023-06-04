import { FormikProps } from 'formik'

export interface RegisterFormProps {
	control: FormikProps<RegisterTypes>
}

interface RegisterTypes {
	email: string
	password: string
	confirmPassword: string
}
