import FieldLayout from '../FieldLayout'
import { TextProps } from './Text.types'

const variants = (isError: string | undefined, isTouched: boolean | undefined) => {
	if (isError && isTouched) {
		return 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
	}
	return 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
}

const Text = ({ name, label, errorMsg, isTouched, ...rest }: TextProps): JSX.Element => {
	const color = variants(errorMsg, isTouched)

	return (
		<FieldLayout name={name} label={label} error={errorMsg} touched={isTouched}>
			<input
				name={name}
				id={name}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${color}`}
				{...rest}
			/>
		</FieldLayout>
	)
}

export default Text
