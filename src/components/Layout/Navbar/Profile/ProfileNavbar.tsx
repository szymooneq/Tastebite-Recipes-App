import { Outlet, useLocation } from 'react-router-dom';
import ProtectedRoute from '../../ProtectedRoute';
import ProfileItem from './ProfileItem';

function ProfileNavbar(): JSX.Element {
	const { pathname } = useLocation();

	return (
		<ProtectedRoute>
			<nav className="-mt-9 text-sm font-semibold text-center border-b text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px">
					<ProfileItem href="">Edycja profilu</ProfileItem>
					<ProfileItem href="przepisy">Moje przepisy</ProfileItem>
					{pathname.includes('dodaj') && (
						<ProfileItem button={true}>Nowy przepis</ProfileItem>
					)}
					{pathname.includes('edytuj') && (
						<ProfileItem button={true}>Edycja przepisu</ProfileItem>
					)}
				</ul>
			</nav>

			<div className="my-4">
				<Outlet />
			</div>
		</ProtectedRoute>
	);
}

export default ProfileNavbar;
