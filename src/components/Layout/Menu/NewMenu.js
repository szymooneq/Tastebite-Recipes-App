import React from 'react'
import useAuth from '../../../hooks/useAuth';
import MenuItem from './MenuItem'

function NewMenu() {
  const [auth, setAuth] = useAuth()
  const logout = (e) => {
    e.preventDefault()
    setAuth(false)
  }

  return (
    <nav className=" dark:bg-gray-900 bg-gray-50">
      <ul className="flex justify-center p-4 mt-4 rounded-lg border border-gray-100 space-x-8 mt-0 text-sm font-medium border-0 dark:bg-gray-800 dark:bg-gray-900 dark:border-gray-700">
        <MenuItem end link="/">Home</MenuItem>
        {auth
        ? (
          <>
            <MenuItem link="profil">Mój profil</MenuItem>
            <li><a className="text-gray-700 hover:bg-gray-100 py-2 px-4 rounded dark:text-white cursor-pointer dark:hover:bg-gray-700 dark:hover:text-white" onClick={logout}>Wyloguj</a></li>
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