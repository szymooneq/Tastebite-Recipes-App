import { IDynamicField } from '../../../lib/interfaces/fields';

function DynamicField({
	placeholder,
	type,
	value,
	setValue
}: IDynamicField): JSX.Element {
	const handleAddItem = () => {
		setValue([...value, '']);
	};

	const handleChangeItem = (
		e: React.ChangeEvent<HTMLInputElement>,
		id: number
	) => {
		const newValue = [...value];
		newValue[id] = e.target.value;
		setValue(newValue);
	};

	const handleDeleteItem = (id: number) => {
		const newValue = [...value];
		newValue.splice(id, 1);
		setValue(newValue);
	};

	return (
		<>
			<ul className={`${type} text-gray-900 dark:text-gray-300`}>
				{value.map((item, id) => (
					<li key={id} className="mb-2 ml-2">
						<div className="flex gap-2 font-normal">
							<input
								placeholder={placeholder}
								onChange={(e) => handleChangeItem(e, id)}
								value={item}
								className={
									'block p-2.5 w-full border text-sm rounded-lg outline-none bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								}
							/>

							<button
								type="button"
								onClick={() => handleDeleteItem(id)}
								className="px-3 py-2 w-max border rounded-lg text-sm font-semibold focus:ring-4 focus:outline-none text-rose-600 border-rose-300 hover:bg-rose-100 focus:ring-rose-300 dark:text-rose-600 dark:hover:bg-gray-800 dark:border-rose-600 dark:focus:ring-rose-800">
								Usuń
							</button>
						</div>
					</li>
				))}
			</ul>

			<button
				type="button"
				onClick={handleAddItem}
				className="block p-2.5 ml-auto w-max border rounded-lg text-sm font-semibold focus:ring-4 focus:outline-none text-sky-600 border-sky-300 hover:bg-sky-100 focus:ring-sky-300 dark:text-sky-600 dark:hover:bg-gray-800 dark:border-sky-600 dark:focus:ring-sky-800">
				Dodaj
			</button>
		</>
	);
}

export default DynamicField;
