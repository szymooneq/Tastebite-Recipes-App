import { Link } from 'react-router-dom';

interface props {
	ariaLabel?: string;
	href: string;
	color: 'green' | 'red' | 'blue';
	children: React.ReactNode;
}

function CustomLink({ href, ariaLabel, color, children }: props): JSX.Element {
	const colorVariants = {
		green:
			'hover:bg-green-800 dark:hover:bg-green-700 bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:focus:ring-green-800',
		red: 'hover:bg-red-800 dark:hover:bg-red-700 bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800',
		blue: 'hover:bg-blue-800 dark:hover:bg-blue-700 bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800'
	};

	return (
		<Link
			aria-label={ariaLabel ? ariaLabel : ''}
			to={href}
			className={`px-5 py-2.5 inline-flex items-center w-max rounded-lg text-sm text-center focus:ring-4 focus:outline-none font-medium text-white ${colorVariants[color]}`}>
			{children}
		</Link>
	);
}

export default CustomLink;
