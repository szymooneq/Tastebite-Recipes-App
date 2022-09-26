import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function Profile(props) {
  const location = useLocation()

  return (
    <>
      <div className="text-sm font-semibold text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <NavLink 
              end 
              to={``}
              className={({ isActive }) =>
                isActive
                  ? "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                  : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }>Edytuj profil</NavLink>
          </li>
          <li className="mr-2">
            <NavLink 
              end
              to={'hotele'}
              className={({ isActive }) =>
                isActive
                  ? "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                  : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }>Hotele</NavLink>
          </li>

          {location.pathname.includes('dodaj') ?  (
          <li className="mr-2">
            <button 
              className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">Dodaj hotel</button>
          </li>
          ) : null}

          {location.pathname.includes('edytuj') ?  (
          <li className="mr-2">
            <button 
              className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500">Edytuj hotel</button>
          </li>
          ) : null}

        </ul>
      </div>
      <div className="pt-4">
        <Outlet />
      </div>
    </>
  
  )
}