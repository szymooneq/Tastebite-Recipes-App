import { InformationCircleIcon } from '@heroicons/react/20/solid';

interface props {
	type?: string;
	message: string;
}

function Alerts({ type, message }: props): JSX.Element {
	let color;

	switch (type) {
		case 'success': {
			color =
				'text-green-700 bg-green-100 dark:bg-green-200 dark:text-green-800';
		}
		case 'danger': {
			color = 'text-red-700 bg-red-100 dark:bg-red-200 dark:text-red-800';
		}
		default: {
			color = 'text-blue-700 bg-blue-100 dark:bg-blue-200 dark:text-blue-800';
		}
	}

	return (
		<div className={`p-4 mb-4 flex text-sm font-bold rounded-lg ${color}`}>
			<InformationCircleIcon className="flex-shrink-0 inline w-5 h-5 mr-3" />
			<div>{message}</div>
		</div>
	);
}

export default Alerts;
