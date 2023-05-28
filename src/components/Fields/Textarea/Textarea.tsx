import { getFieldStyles } from '@/lib/helpers/getFieldStyles'
import { TextareaProps } from './Textarea.types'

import ErrorMsg from '@/components/Fields/ErrorMsg'

const Textarea = ({ name, label, errorMsg, isTouched, ...rest }: TextareaProps): JSX.Element => {
	const styles = getFieldStyles(errorMsg, isTouched)
	const { fieldStyle, labelStyle } = styles

	return (
		<div className="mb-4">
			<label htmlFor={name} className={`block mb-2 text-sm font-medium ${labelStyle}`}>
				{label}
			</label>

			<textarea
				name={name}
				id={name}
				rows={4}
				{...rest}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${fieldStyle}`}
			/>

			<ErrorMsg content={errorMsg} isTouched={isTouched} />
		</div>
	)
}

export default Textarea
