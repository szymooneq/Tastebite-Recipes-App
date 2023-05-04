interface props {
	name: string;
	label: string;
	error: string | undefined;
	touched: boolean | undefined;
	children: React.ReactNode;
}

function FieldLayout({
	name,
	label,
	error,
	touched,
	children
}: props): JSX.Element {
	const labelColors =
		error && touched
			? 'text-red-700 dark:text-red-500'
			: 'text-gray-900 dark:text-gray-300';

	return (
		<div className="mb-4">
			<label
				htmlFor={name}
				className={`block mb-2 text-sm font-medium ${labelColors}`}>
				{label}
			</label>

			{children}

			{error && touched && (
				<p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
					{error}
				</p>
			)}
		</div>
	);
}

export default FieldLayout;
