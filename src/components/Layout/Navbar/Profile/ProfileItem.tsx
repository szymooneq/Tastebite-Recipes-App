import { NavLink } from 'react-router-dom';

interface props {
	href?: string;
	button?: boolean;
	children: React.ReactNode;
}

function ProfileItem({ button, href, children }: props): JSX.Element {
	const className =
		'p-4 inline-block rounded-t-lg border-b-2 border-transparent';
	const activeColor =
		'text-green-600 border-green-600 active dark:text-green-500 dark:border-green-500';
	const inActiveColor =
		'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300';

	return (
		<li className="mr-2">
			{button ? (
				<button className={`${className} ${activeColor}`}>{children}</button>
			) : (
				<NavLink
					end
					to={href ? href : ''}
					className={({ isActive }) =>
						`${className} ${isActive ? activeColor : inActiveColor}`
					}>
					{children}
				</NavLink>
			)}
		</li>
	);
}

export default ProfileItem;
