import React from 'react';
import PreviewImage from './PreviewImage';

interface props {
	name: string;
	error: string | undefined;
	touch: boolean | undefined;
	value: string | number | boolean;
	label: string;
	type: string;
	step?: number;
	placeholder?: string;
	options?: string[];
	onChange: (e: React.ChangeEvent) => void;
	onBlur: (e: React.FocusEvent) => void;
	file?: {
		lastModified?: number;
		name?: string;
		size?: number;
		webkitRelativePath?: string;
	} | null;
}

const Text = ({
	name,
	type,
	label,
	value,
	placeholder,
	error,
	touch,
	onChange,
	onBlur
}: props): JSX.Element => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className={`block mb-2 text-sm font-medium ${
					error && touch
						? 'text-red-700 dark:text-red-500'
						: 'text-gray-900 dark:text-gray-300'
				} `}>
				{label}
			</label>

			<input
				type={type}
				name={name}
				value={value || ''}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
					error && touch
						? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
						: 'bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}`}
			/>

			{error && touch && (
				<p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
					{error}
				</p>
			)}
		</div>
	);
};

const Number = ({
	name,
	type,
	label,
	value,
	placeholder,
	error,
	step,
	touch,
	onChange,
	onBlur
}: props): JSX.Element => {
	return (
		<div className="mb-4 w-full">
			<label
				htmlFor={name}
				className={`block mb-2 text-sm font-medium ${
					error && touch
						? 'text-red-700 dark:text-red-500'
						: 'text-gray-900 dark:text-gray-300'
				} `}>
				{label}
			</label>

			<input
				type={type}
				name={name}
				value={value || ''}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				step={step}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
					error && touch
						? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
						: 'bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}`}
			/>

			{error && touch && (
				<p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
					{error}
				</p>
			)}
		</div>
	);
};

const Textarea = ({
	name,
	label,
	value,
	placeholder,
	error,
	touch,
	onChange,
	onBlur
}: props): JSX.Element => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className={`block mb-2 text-sm font-medium ${
					error && touch
						? 'text-red-700 dark:text-red-500'
						: 'text-gray-900 dark:text-gray-300'
				} `}>
				{label}
			</label>

			<textarea
				name={name}
				value={value || ''}
				onChange={onChange}
				onBlur={onBlur}
				placeholder={placeholder}
				rows={4}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
					error && touch
						? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
						: 'bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}`}></textarea>

			{error && touch && (
				<p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
					{error}
				</p>
			)}
		</div>
	);
};

const Select = ({
	name,
	label,
	value,
	error,
	touch,
	options,
	onChange,
	onBlur
}: props): JSX.Element => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className={`block mb-2 text-sm font-medium ${
					error && touch
						? 'text-red-700 dark:text-red-500'
						: 'text-gray-900 dark:text-gray-300'
				} `}>
				{label}
			</label>

			<select
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className={`block w-full p-2.5 border text-sm rounded-lg outline-none ${
					error && touch
						? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
						: 'bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}`}>
				<option className="bg-gray-100" value="" disabled hidden>
					Wybierz opcję
				</option>
				{options?.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>

			{error && touch && (
				<p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-500">
					{error}
				</p>
			)}
		</div>
	);
};

/* const Checkbox = ({
	name,
	label,
  type,
	value,
	options,
	placeholder,
	error,
	touch,
	onChange,
	onBlur
}: props): JSX.Element => {
	return (
		<div className="mb-4">
			{options?.map((option) => (
				<div key={option} className="flex items-center mb-4">
					<input
						type={type}
						name={name}
						value={option}
						onChange={onChange}
						onBlur={onBlur}
						checked={value.find((x) => x === option.value) || false}
						className="w-4 h-4 rounded text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
					/>

					<label
						htmlFor={option.value}
						className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
						{option.label}
					</label>
				</div>
			))}
		</div>
	);
}; */

const File = ({
	name,
	label,
	error,
	onChange,
	file,
	img
}: props): JSX.Element => {
	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className={`block mb-2 text-sm font-medium ${
					error
						? 'text-red-700 dark:text-red-500'
						: 'text-gray-900 dark:text-gray-300'
				} `}>
				{label}
			</label>

			{(img || file) && !error && <PreviewImage file={file} img={img} />}

			<input
				type="file"
				name={name}
				onChange={(e: React.ChangeEvent) => onChange(e.target.files[0])}
				className={`w-full border text-sm rounded-lg outline-none ${
					error
						? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
						: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				}`}
			/>

			{error && (
				<p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
					{error}
				</p>
			)}
		</div>
	);
};

const Switch = ({
	name,
	label,
	value,
	onChange,
	onBlur
}: props): JSX.Element => {
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
};

function Field(props: props) {
	switch (props.type) {
		case 'text':
			return <Text {...props} />;
		case 'textarea':
			return <Textarea {...props} />;
		case 'email':
			return <Text {...props} type="email" />;
		case 'password':
			return <Text {...props} type="password" />;
		case 'number':
			return <Number {...props} />;
		case 'select':
			return <Select {...props} />;
		/* case 'checkbox':
			return <Checkbox {...props} />; */
		case 'file':
			return <File {...props} />;
		case 'switch':
			return <Switch {...props} />;
		default:
			return <Text {...props} />;
	}
}

export default Field;
