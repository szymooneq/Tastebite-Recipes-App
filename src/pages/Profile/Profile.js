import ProfileDetails from "./ProfileDetails/ProfileDetails";
import MyHotels from "./MyHotels/MyHotels";
import { NavLink, Outlet } from 'react-router-dom';

export default function Profile(props) {

  /* return (
    <div className="card">
      <div className="card-header">
        <h2>Mój profil</h2>
      </div>
      <div className="card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <NavLink end className="nav-link" to={``}>Profil</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to={'hotele'}>Hotele</NavLink>
          </li>
        </ul>

        <div className="pt-4">
          <Outlet />
        </div>
      </div>
    </div>
  ) */
  
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
                to={'hotele'}
                className={({ isActive }) =>
                  isActive
                    ? "inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                    : "inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }>Hotele</NavLink>
          </li>
        </ul>
      </div>
      <div className="pt-4">
        <Outlet />
      </div>
    </>
  
  )
}