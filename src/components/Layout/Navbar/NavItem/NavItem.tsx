import { Link, NavLink } from 'react-router-dom'
import { NavItemProps } from './NavItem.types'

const active = 'text-white bg-rose-600'
const inActive = 'text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'

const NavItem = ({ href, onClick, children, isLink = false }: NavItemProps): JSX.Element =>
	isLink ? (
		<Link to={href} onClick={onClick} className={`py-2 px-4 rounded ${inActive}`}>
			{children}
		</Link>
	) : (
		<NavLink
			to={href}
			className={({ isActive }) => `py-2 px-4 rounded ${isActive ? active : inActive}`}>
			{children}
		</NavLink>
	)

export default NavItem
