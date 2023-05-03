import NavItem from './NavItem'
import { useAuth } from '../../../lib/hooks/useAuth'

const Navbar = (): JSX.Element => {
	const { user, logoutUser } = useAuth()

	return (
		<nav className="p-4 flex justify-center items-center gap-6 text-sm font-bold bg-gray-100 dark:bg-gray-800">
			<NavItem href="/">Home</NavItem>
			{user ? (
				<>
					<NavItem href="profil">Profil</NavItem>
					<NavItem href="/" onClick={() => logoutUser()} isLink>
						Wyloguj
					</NavItem>
				</>
			) : (
				<>
					<NavItem href="rejestracja">Rejestracja</NavItem>
					<NavItem href="logowanie">Logowanie</NavItem>
				</>
			)}
		</nav>
	)
}

export default Navbar
