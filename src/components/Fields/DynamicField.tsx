import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid'
import { IDynamicField } from '../../lib/interfaces/fields'
import Button from '../UI/Button/Button'

function DynamicField({
	name,
	placeholder,
	type,
	error,
	array,
	setArray
}: IDynamicField): JSX.Element {
	const handleAddItem = () => {
		setArray([...array, ''])
	}

	const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
		const newValue = [...array]
		newValue[id] = e.target.value
		setArray(newValue)
	}

	const handleDeleteItem = (id: number) => {
		const newValue = [...array]
		newValue.splice(id, 1)
		setArray(newValue)
	}

	return (
		<>
			<ul className={`${type} text-gray-900 dark:text-gray-300`}>
				{array.map((item, id) => {
					const fieldColors =
						error && error[id]
							? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
							: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

					const markerColor =
						error && error[id]
							? 'marker:text-red-900 marker:dark:text-red-500'
							: 'marker:text-gray-900 marker:dark:text-gray-300'

					return (
						<li key={id} className={`mb-2 ml-2 ${markerColor}`}>
							<div className="flex gap-2 font-normal">
								<label htmlFor={`${name}-${id}`} hidden>{`${name}-${id}`}</label>
								<input
									id={`${name}-${id}`}
									placeholder={placeholder}
									onChange={(e) => handleChangeItem(e, id)}
									value={item}
									className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${fieldColors}`}
								/>

								{id !== 0 && (
									<>
										<Button
											color="redOutline"
											aria-label="Usuń pozycję"
											type="button"
											onClick={() => handleDeleteItem(id)}
											disabled={false}>
											<TrashIcon className="w-4 h-4" />
										</Button>
									</>
								)}
							</div>
						</li>
					)
				})}
			</ul>

			<div className="w-full inline-flex justify-end">
				<Button
					color="greenOutline"
					aria-label="Dodaj pozycję"
					type="button"
					onClick={handleAddItem}
					disabled={false}>
					<PlusIcon className="w-4 h-4" />
				</Button>
			</div>
		</>
	)
}

export default DynamicField
