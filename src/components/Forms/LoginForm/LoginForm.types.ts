import { FormikProps } from 'formik'

export interface LoginFormProps {
	control: FormikProps<Login>
}

interface Login {
	email: string
	password: string
}
