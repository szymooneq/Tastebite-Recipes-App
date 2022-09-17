import ProfileDetails from "./ProfileDetails/ProfileDetails";
import MyHotels from "./MyHotels/MyHotels";
import { NavLink, Outlet } from 'react-router-dom';

export default function Profile(props) {

  throw new Error('Problem z internetem')

  return (
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
  )
}