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
    <nav className='bg-gray-100 dark:bg-gray-800'>
      <ul className="p-4 mt-0 flex justify-center gap-6 text-sm font-medium">
        <MenuItem end={"end"} link="/">Home</MenuItem>
        {user ? (
          <>
            <MenuItem link="profil">Mój profil</MenuItem>
            <li>
              <Link to={'/'} className="text-gray-700 hover:bg-green-100 py-2 px-4 rounded dark:text-white cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLogout}>Wyloguj</Link>
            </li>
          </>
        ): (
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