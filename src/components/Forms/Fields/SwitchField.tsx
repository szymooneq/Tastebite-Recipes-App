import { ISwitchField } from '../../../lib/interfaces/fields';

function SwitchField({
	name,
	label,
	value,
	onChange,
	onBlur
}: ISwitchField): JSX.Element {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
				{label}
			</label>

			<label
				htmlFor={name}
				className="inline-flex relative items-center cursor-pointer">
				<input
					type="checkbox"
					id={name}
					name={name}
					checked={value}
					onChange={onChange}
					onBlur={onBlur}
					className="sr-only peer"
				/>

				<div className="w-11 h-6 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full bg-gray-200 dark:bg-gray-700 dark:border-gray-600 peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:border after:rounded-full after:transition-all after:bg-white after:border-gray-300 peer-checked:after:border-white"></div>

				<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
					{value ? 'Aktywny' : 'Ukryty'}
				</span>
			</label>
		</div>
	);
}

export default SwitchField;
