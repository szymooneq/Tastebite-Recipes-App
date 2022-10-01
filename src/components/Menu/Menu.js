import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import MenuItem from './MenuItem';

function NewMenu() {
  const { user, logout } = useContext(AuthContext)
  
  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <nav className=" dark:bg-gray-900 bg-gray-50">
      <ul className="flex justify-center p-4 mt-0 rounded-lg border-gray-100 space-x-8 text-sm font-medium border-0 dark:bg-gray-900 dark:border-gray-700">
        <MenuItem end={"end"} link="/">Home</MenuItem>
        {user
        ? (
          <>
            <MenuItem link="profil">Mój profil</MenuItem>
            <li><Link to={'/'} className="text-gray-700 hover:bg-gray-100 py-2 px-4 rounded dark:text-white cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLogout}>Wyloguj</Link></li>
          </>
        )
        : (
          <>
            <MenuItem link="rejestracja">Register</MenuItem>
            <MenuItem link="zaloguj">Login</MenuItem>
          </>
        )
      }
      </ul>
    </nav>
  );
}

export default NewMenu