import { useState } from 'react';
import { IFileField } from '../../../lib/interfaces/fields';
import Image from '../../UI/Image';

function FileField({
	name,
	label,
	error,
	imgSrc,
	file,
	onChange
}: IFileField): JSX.Element {
	const [preview, setPreview] = useState(imgSrc);

	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			if (reader.result && typeof reader.result === 'string') {
				setPreview(reader.result);
			}
		};
	}

	const labelColors = error
		? 'text-red-700 dark:text-red-500'
		: 'text-gray-900 dark:text-gray-300';

	const fieldColors = error
		? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
		: 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';

	const changeImageHandler = (e: React.ChangeEvent) => {
		const { files } = e.currentTarget as HTMLInputElement;
		if (files) onChange(files[0]);
	};

	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className={`block mb-2 text-sm font-medium ${labelColors}`}>
				{label}
			</label>

			{preview && !error && (
				<Image
					className="w-full mb-2 h-52 rounded-lg object-cover object-center"
					src={preview}
					alt="Food preview"
				/>
			)}

			<input
				type="file"
				name={name}
				onChange={changeImageHandler}
				className={`w-full border text-sm rounded-lg outline-none ${fieldColors}`}
				accept="image/png, image/jpeg, image/webp"
			/>

			{error && (
				<p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
					{error}
				</p>
			)}
		</div>
	);
}

export default FileField;
