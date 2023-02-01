interface props {
	ariaLabel?: string;
	type: 'submit' | 'button';
	color: 'green' | 'red' | 'blue' | 'gray' | 'redOutline' | 'greenOutline';
	disabled: boolean;
	children: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Button({
	ariaLabel,
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
		gray: 'bg-gray-700 focus:ring-gray-300 dark:bg-gray-600 dark:focus:ring-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700',
		redOutline:
			'text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900',
		greenOutline:
			'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900'
	};

	const buttonAllowed = 'focus:ring-4';
	const buttonDisabled = 'cursor-not-allowed disabled:opacity-75';

	return (
		<button
			aria-label={ariaLabel ? ariaLabel : ''}
			type={type}
			disabled={disabled}
			onClick={(e) => onClick && onClick(e)}
			className={`px-5 py-2.5 inline-flex items-center w-max rounded-lg text-sm text-center focus:outline-none font-medium text-white ${
				disabled ? buttonDisabled : buttonAllowed
			} ${colorVariants[color]}`}>
			{children}
		</button>
	);
}

export default Button;
