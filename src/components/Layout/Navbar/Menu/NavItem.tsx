import { Link, NavLink } from 'react-router-dom';

interface props {
	href: string;
	onClick?: () => void;
	children: React.ReactNode;
}

function NavItem({ href, onClick, children }: props): JSX.Element {
	const activeColor = 'text-white bg-rose-600';
	const inActiveColor =
		'text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700';

	return onClick ? (
		<Link
			to={href}
			onClick={onClick}
			className={`py-2 px-4 rounded ${inActiveColor}`}>
			{children}
		</Link>
	) : (
		<NavLink
			to={href}
			className={({ isActive }) =>
				`py-2 px-4 rounded ${isActive ? activeColor : inActiveColor}`
			}>
			{children}
		</NavLink>
	);
}

export default NavItem;
