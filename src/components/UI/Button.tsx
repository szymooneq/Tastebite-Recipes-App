import { buttonSpinner } from './SVG/buttonSpinner';

interface props {
	type: 'submit' | 'button';
	color: 'green' | 'red' | 'blue' | 'gray';
	disabled: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
	type,
	color,
	disabled,
	children,
	onClick
}: props): JSX.Element {
	const colorVariants = {
		green:
			'bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:focus:ring-green-800 hover:bg-green-800 dark:hover:bg-green-700',
		red: 'bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800 hover:bg-red-800 dark:hover:bg-red-700',
		blue: 'bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 hover:bg-blue-800 dark:hover:bg-blue-700',
		gray: 'bg-gray-700 focus:ring-gray-300 dark:bg-gray-600 dark:focus:ring-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700'
	};

	const buttonAllowed = 'focus:ring-4';
	const buttonDisabled = 'cursor-not-allowed disabled:opacity-75';

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={(e) => onClick && onClick(e)}
			className={`px-5 py-2.5 inline-flex items-center w-max rounded-lg text-sm text-center focus:outline-none font-medium text-white ${
				disabled ? buttonDisabled : buttonAllowed
			} ${colorVariants[color]}`}>
			{/* {disabled && buttonSpinner} */}
			{children}
		</button>
	);
}

export default Button;
