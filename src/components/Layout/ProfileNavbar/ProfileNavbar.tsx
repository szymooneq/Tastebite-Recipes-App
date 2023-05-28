import { Outlet, useLocation } from 'react-router-dom'
import ProtectedRoute from '@/components/Layout/ProtectedRoute'

import ProfileItem from './NavItem'

const ProfileNavbar = (): JSX.Element => {
	const { pathname } = useLocation()

	return (
		<ProtectedRoute>
			<nav className="-mt-9 text-sm font-semibold text-center border-b text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px">
					<ProfileItem>Edycja profilu</ProfileItem>
					<ProfileItem href="recipes">Moje przepisy</ProfileItem>
					{pathname.includes('dodaj') ? <ProfileItem isButton>Nowy przepis</ProfileItem> : null}
					{pathname.includes('edytuj') ? <ProfileItem isButton>Edycja przepisu</ProfileItem> : null}
				</ul>
			</nav>

			<div className="my-4">
				<Outlet />
			</div>
		</ProtectedRoute>
	)
}

export default ProfileNavbar
