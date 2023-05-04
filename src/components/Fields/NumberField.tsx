import { INumberField } from '../../lib/interfaces/fields'
import FieldLayout from './FieldLayout'

function NumberField({
	name,
	label,
	value,
	placeholder,
	step,
	error,
	touched,
	onChange,
	onBlur
}: INumberField) {
	const fieldColors =
		error && touched
			? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
			: 'bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

	return (
		<FieldLayout name={name} label={label} error={error} touched={touched}>
			<input
				type="number"
				name={name}
				id={name}
				placeholder={placeholder}
				value={value === 0 ? '' : value}
				step={step}
				onChange={onChange}
				onBlur={onBlur}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${fieldColors}`}
			/>
		</FieldLayout>
	)
}

export default NumberField
