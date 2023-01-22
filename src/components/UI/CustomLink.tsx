import { Link } from 'react-router-dom';

interface props {
	href: string;
	color: 'green' | 'red';
	children: React.ReactNode;
}

function CustomLink({ href, color, children }: props): JSX.Element {
	let linkColor: string;

	/* 	switch (color) {
		case 'green': {
			linkColor =
				'hover:bg-green-800 dark:hover:bg-green-700 bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:focus:ring-green-800';
		}
		case 'red': {
			linkColor =
				'hover:bg-red-800 dark:hover:bg-red-700 bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800';
		}
	} */

	if (color === 'green') {
		linkColor =
			'hover:bg-green-800 dark:hover:bg-green-700 bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:focus:ring-green-800';
	} else {
		linkColor =
			'hover:bg-red-800 dark:hover:bg-red-700 bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800';
	}

	console.log(color);
	return (
		<Link
			to={href}
			className={`px-5 py-2.5 inline-flex items-center w-max rounded-lg text-sm text-center focus:ring-4 focus:outline-none font-medium text-white ${linkColor}`}>
			{children}
		</Link>
	);
}

export default CustomLink;
