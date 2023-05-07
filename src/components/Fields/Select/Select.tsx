import { SelectProps } from './Select.types'
import { getFieldStyles } from '../../../lib/helpers/getFieldStyles'
import ErrorMsg from '../ErrorMsg/ErrorMsg'

const renderOptions = () => {
	const options = [
		{ name: 'easy', content: 'Łatwy' },
		{ name: 'medium', content: 'Średni' },
		{ name: 'hard', content: 'Trudny' }
	]

	const optionDefault = (
		<option className="bg-gray-100" value={' '} disabled hidden>
			Wybierz opcję
		</option>
	)

	const optionList = options.map((option) => (
		<option key={option.name} value={option.name}>
			{option.content}
		</option>
	))

	return (
		<>
			{optionDefault}
			{optionList}
		</>
	)
}

const Select = ({ name, label, errorMsg, isTouched, ...rest }: SelectProps): JSX.Element => {
	const styles = getFieldStyles(errorMsg, isTouched)
	const { fieldStyle, labelStyle } = styles

	return (
		<div className="mb-4">
			<label htmlFor={name} className={`block mb-2 text-sm font-medium ${labelStyle}`}>
				{label}
			</label>

			<select
				id={name}
				name={name}
				{...rest}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none hover:cursor-pointer ${fieldStyle}`}>
				{renderOptions()}
			</select>

			<ErrorMsg content={errorMsg} isTouched={isTouched} />
		</div>
	)
}

export default Select
