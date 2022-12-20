import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import NavItem from "./NavItem";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <nav className="p-4 flex justify-center items-center gap-6 text-sm font-bold bg-gray-100 dark:bg-gray-800">
      <NavItem type="end" href="/">
        Home
      </NavItem>
      {user ? (
        <>
          <NavItem href="profil">Mój profil</NavItem>
          <NavItem type="logout" onClick={handleLogout}>
            Wyloguj
          </NavItem>
        </>
      ) : (
        <>
          <NavItem href="rejestracja">Rejestracja</NavItem>
          <NavItem href="logowanie">Logowanie</NavItem>
        </>
      )}
    </nav>
  );
}
