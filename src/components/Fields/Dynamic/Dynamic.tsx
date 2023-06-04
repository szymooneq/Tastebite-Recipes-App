import { PlusIcon } from '@heroicons/react/20/solid'
import { DynamicProps } from './Dynamic.types'

import DynamicInput from './DynamicInput'
import Button from '@/components/UI/Button'

const Dynamic = ({
	name,
	placeholder,
	listType,
	errorMsg,
	value,
	setValue
}: DynamicProps): JSX.Element => {
	const handleAddItem = () => {
		const newValue = [...value, '']
		setValue(name, newValue)
	}

	const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const newValue = [...value]
		newValue[index] = e.target.value
		setValue(name, newValue)
	}

	const handleDeleteItem = (index: number) => {
		const newValue = [...value]
		newValue.splice(index, 1)
		setValue(name, newValue)
	}

	return (
		<>
			<ul className={`${listType} text-gray-900 dark:text-gray-300`}>
				{value.map((item, index) => (
					<DynamicInput
						key={index}
						index={index}
						name={`${name}-${index}`}
						placeholder={placeholder}
						value={item}
						errorMsg={errorMsg ? errorMsg[index] : undefined}
						changeValue={handleChangeItem}
						deleteValue={handleDeleteItem}
					/>
				))}
			</ul>

			<div className="w-full inline-flex justify-end">
				<Button
					type="button"
					color="greenOutline"
					aria-label="Dodaj pozycję"
					onClick={handleAddItem}>
					<PlusIcon className="w-4 h-4" />
				</Button>
			</div>
		</>
	)
}

export default Dynamic
