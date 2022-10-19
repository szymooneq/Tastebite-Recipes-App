import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import NavItem from './NavItem';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  
  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <nav className='bg-gray-100 dark:bg-gray-800'>
      <ul className="p-4 mt-0 flex justify-center gap-6 text-sm font-medium">
        <NavItem end={"end"} link="/">Home</NavItem>
        {user ? (
          <>
            <NavItem link="profil">Mój profil</NavItem>
            <li>
              <Link to={'/'} className="text-gray-700 hover:bg-green-100 py-2 px-4 rounded dark:text-white cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLogout}>Wyloguj</Link>
            </li>
          </>
        ): (
          <>
            <NavItem link="rejestracja">Register</NavItem>
            <NavItem link="zaloguj">Login</NavItem>
          </>
        )
      }
      </ul>
    </nav>
  );
}
