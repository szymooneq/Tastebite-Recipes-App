import { InformationCircleIcon } from '@heroicons/react/20/solid';

interface props {
	color: 'green' | 'red' | 'yellow';
	message: string;
}

function Alert({ color, message }: props): JSX.Element {
	const colorVariants = {
		green:
			'text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400',
		red: 'text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400',
		yellow:
			'text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400'
	};

	return (
		<div
			className={`flex p-4 mb-4 text-sm ${colorVariants[color]}`}
			role="alert">
			<InformationCircleIcon className="flex-shrink-0 inline w-5 h-5 mr-3" />
			<span className="sr-only">Info</span>
			<div>
				<span className="font-semibold">{message}</span>
			</div>
		</div>
	);
}

export default Alert;
