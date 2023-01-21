import { buttonSpinner } from './SVG/buttonSpinner';

interface props {
	type: 'submit' | 'button';
	disabled: boolean;
	loading?: boolean;
	children: React.ReactNode;
}

function Button({ type, disabled, loading, children }: props): JSX.Element {
	const buttonColor =
		'bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:focus:ring-green-800';

	const buttonAllowed =
		'focus:ring-4 hover:bg-green-800 dark:hover:bg-green-700';
	const buttonDisabled = 'cursor-not-allowed disabled:opacity-75';

	return (
		<button
			type={type}
			disabled={disabled}
			className={`px-5 py-2.5 inline-flex items-center w-max rounded-lg text-sm text-center focus:outline-none font-medium text-white ${
				disabled ? buttonDisabled : buttonAllowed
			} ${buttonColor}`}>
			{loading && buttonSpinner}
			{children}
		</button>
	);
}

export default Button;
