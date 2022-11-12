import { useContext } from 'react';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../../context/authContext';

export default function Profile() {
  const location = useLocation()
  const context = useContext(AuthContext)

  return context.user ? (
    <>
      <nav className="-mt-6 text-sm font-semibold text-center border-b text-gray-500 border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <NavLink 
              end 
              to={``}
              className={({ isActive }) => `inline-block p-4 rounded-t-lg border-b-2 ${isActive ? "text-green-600 border-green-600 active dark:text-green-500 dark:border-green-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}>Edycja profilu</NavLink>
          </li>
          <li className="mr-2">
            <NavLink 
              end
              to={'przepisy'}
              className={({ isActive }) => `inline-block p-4 rounded-t-lg border-b-2 ${isActive ? "text-green-600 border-green-600 active dark:text-green-500 dark:border-green-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`}>Moje przepisy</NavLink>
          </li>
            
          {location.pathname.includes('dodaj') && (
            <li className="mr-2">
              <button className="p-4 inline-block rounded-t-lg border-b-2 active text-green-600 border-green-600 dark:text-green-500 dark:border-green-500">Nowy przepis</button>
            </li>
          )}

          {location.pathname.includes('edytuj') && (
            <li className="mr-2">
              <button className="p-4 inline-block rounded-t-lg border-b-2 active text-green-600 border-green-600 dark:text-green-500 dark:border-green-500">Edycja przepisu</button>
            </li>
          )}

        </ul>
      </nav>

      <div className="my-4">
        <Outlet />
      </div>
    </>
  ) : <Navigate to={'/logowanie'} />
}