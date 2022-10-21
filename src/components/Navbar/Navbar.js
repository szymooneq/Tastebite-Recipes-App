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
    <nav className='p-4 flex justify-center items-center gap-6 text-sm font-medium bg-gray-100 dark:bg-gray-800'>
      <NavItem end={true} link="/">Home</NavItem>
      {user ? (
        <>
          <NavItem link="profil">Mój profil</NavItem>
          <Link to={'/'} onClick={handleLogout} className="py-2 px-4 rounded cursor-pointer text-gray-700 hover:bg-green-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white">Wyloguj</Link>
        </>
      ): (
        <>
          <NavItem link="rejestracja">Register</NavItem>
          <NavItem link="logowanie">Login</NavItem>
        </>
      )}
    </nav>
  )
}
