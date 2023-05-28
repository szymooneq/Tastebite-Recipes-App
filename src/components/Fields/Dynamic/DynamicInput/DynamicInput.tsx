import { TrashIcon } from '@heroicons/react/20/solid'
import { getFieldStyles } from '@/lib/helpers/getFieldStyles'
import { DynamicInputProps } from './DynamicInput.types'

import Button from '@/components/UI/Button'

const DynamicInput = ({
	index,
	name,
	value,
	errorMsg,
	deleteValue,
	changeValue
}: DynamicInputProps) => {
	const styles = getFieldStyles(errorMsg, true)
	const { fieldStyle, markerStyle } = styles

	return (
		<div className={`flex gap-2 font-normal mb-2 ml-2 ${markerStyle}`}>
			<div className="flex-1">
				<label htmlFor={name} hidden>
					{name}
				</label>
				<input
					id={name}
					className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${fieldStyle}`}
					value={value}
					onChange={(e) => changeValue(e, index)}
				/>
			</div>

			{index !== 0 ? (
				<Button
					color="redOutline"
					aria-label="Usuń pozycję"
					type="button"
					onClick={() => deleteValue(index)}
					disabled={false}>
					<TrashIcon className="w-4 h-4" />
				</Button>
			) : null}
		</div>
	)
}

export default DynamicInput
