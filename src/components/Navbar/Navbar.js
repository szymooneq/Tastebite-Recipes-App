import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import NavItem from './NavItem';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  
  const handleLogout = (e) => {
    e.preventDefault()
    logout()
  }

  return (
    <nav className='p-4 flex justify-center items-center gap-6 text-sm font-bold bg-gray-100 dark:bg-gray-800'>
      <NavItem end={true} link="/">Home</NavItem>
      {user ? (
        <>
          <NavItem link="profil">Mój profil</NavItem>
          <Link to={'/'} onClick={handleLogout} className="py-2 px-4 rounded cursor-pointer text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">Wyloguj</Link>
        </>
      ): (
        <>
          <NavItem link="rejestracja">Rejestracja</NavItem>
          <NavItem link="logowanie">Logowanie</NavItem>
        </>
      )}
    </nav>
  )
}
