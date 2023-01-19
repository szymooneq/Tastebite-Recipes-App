import { Link, NavLink } from 'react-router-dom';

interface props {
	type?: 'end' | 'logout';
	href?: string;
	onClick?: () => void;
	children: React.ReactNode;
}

function NavItem({ type, href, onClick, children }: props): JSX.Element {
	switch (type) {
		case 'end':
			return (
				<NavLink
					end
					to={href ? href : ''}
					className={({ isActive }) =>
						`py-2 px-4 rounded ${
							isActive
								? 'text-white bg-green-700'
								: 'text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
						}`
					}>
					{children}
				</NavLink>
			);

		case 'logout':
			return (
				<Link
					to={'/'}
					onClick={onClick}
					className="py-2 px-4 rounded cursor-pointer text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
					Wyloguj
				</Link>
			);

		default:
			return (
				<NavLink
					to={href ? href : ''}
					className={({ isActive }) =>
						`py-2 px-4 rounded ${
							isActive
								? 'text-white bg-green-700'
								: 'text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
						}`
					}>
					{children}
				</NavLink>
			);
	}
}

export default NavItem;
