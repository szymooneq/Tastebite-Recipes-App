import { useContext } from 'react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import authContext from '../../../context/authContext'
import ProfileItem from './ProfileItem'

export default function Profile() {
  const { pathname } = useLocation()
  const { user } = useContext(authContext)

  return user ? (
    <>
      <nav className="-mt-6 text-sm font-semibold text-center border-b text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <ProfileItem href="">Edycja profilu</ProfileItem>
          <ProfileItem href="przepisy">Moje przepisy</ProfileItem>
          {pathname.includes('dodaj') && <ProfileItem type="button">Nowy przepis</ProfileItem>}
          {pathname.includes('edytuj') && <ProfileItem type="button">Edycja przepisu</ProfileItem>}
        </ul>
      </nav>

      <div className="my-4">
        <Outlet />
      </div>
    </>
  ) : <Navigate to={'/logowanie'} />
}