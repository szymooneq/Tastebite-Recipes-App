import { TextProps } from './Text.types'
import { getFieldStyles } from '../../../lib/helpers/getFieldStyles'
import ErrorMsg from '../ErrorMsg/ErrorMsg'

const Text = ({ name, label, errorMsg, isTouched, ...rest }: TextProps): JSX.Element => {
	const styles = getFieldStyles(errorMsg, isTouched)
	const { fieldStyle, labelStyle } = styles

	return (
		<div className="mb-4">
			<label htmlFor={name} className={`block mb-2 text-sm font-medium ${labelStyle}`}>
				{label}
			</label>

			<input
				name={name}
				id={name}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${fieldStyle}`}
				{...rest}
			/>

			<ErrorMsg content={errorMsg} isTouched={isTouched} />
		</div>
	)
}

export default Text
