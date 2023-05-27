import { NavLink } from 'react-router-dom'
import { NavItemProps } from './NavItem.types'

const baseStyle = 'p-4 inline-block rounded-t-lg border-b-2'
const active = 'text-blue-600 border-b-blue-600 active dark:text-blue-500 dark:border-b-blue-500'
const inActive =
	'border-b-gray-300 hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'

const NavItem = ({ children, href = '', isButton = false }: NavItemProps): JSX.Element => (
	<li className="mr-2">
		{isButton ? (
			<button className={`${baseStyle} ${active}`}>{children}</button>
		) : (
			<NavLink
				end
				to={href}
				className={({ isActive }) => `${baseStyle} ${isActive ? active : inActive}`}>
				{children}
			</NavLink>
		)}
	</li>
)

export default NavItem
