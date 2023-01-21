import { buttonSpinner } from '../SVG/buttonSpinner';

interface props {
	loading: boolean;
	loadingMessage: string;
	children: React.ReactNode;
}

function LoadingButton({
	loading,
	loadingMessage,
	children
}: props): JSX.Element {
	return loading ? (
		<button
			disabled={loading}
			className="p-2.5 text-sm font-bold rounded-lg focus:ring-4 focus:outline-none cursor-not-allowed disabled:opacity-75 text-white bg-green-700 dark:bg-green-600">
			<div className="flex justify-center items-center">
				{buttonSpinner}
				{loadingMessage}
			</div>
		</button>
	) : (
		<button
			type="submit"
			className="p-2.5 text-sm font-bold rounded-lg focus:ring-4 focus:outline-none text-white bg-green-700 dark:bg-green-600 hover:bg-green-800 dark:hover:bg-green-700 focus:ring-green-200 dark:focus:ring-green-800">
			{children}
		</button>
	);
}

export default LoadingButton;
