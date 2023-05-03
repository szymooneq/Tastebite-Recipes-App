import { useContext } from 'react'
import { Context } from '../../../../lib/context/Auth/AuthProvider'
import NavItem from './NavItem'

function Navbar(): JSX.Element {
	const { state, logout } = useContext(Context)

	return (
		<nav className="p-4 flex justify-center items-center gap-6 text-sm font-bold bg-gray-100 dark:bg-gray-800">
			<NavItem href="/">Home</NavItem>
			{state.user ? (
				<>
					<NavItem href="profil">Profil</NavItem>
					<NavItem href="/" onClick={() => logout()}>
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
