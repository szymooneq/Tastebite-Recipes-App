import style from './Menu.module.css';
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from 'react-router-dom';

function Menu() {
  const [auth, setAuth] = useAuth()

  const login = (e) => {
    e.preventDefault()
    setAuth(true)
  }

  const logout = (e) => {
    e.preventDefault()
    setAuth(false)
  }

  let activeClassName = style.menuItemActive;

  return (
    <div className={style.menuContainer}>
      <ol className={`${style.menu} breadcrumb`}>
        <li className={`${style.menuItem} breadcrumb-item`}>
          <NavLink end to={"/"} className={({ isActive }) => isActive ? activeClassName : undefined}>Home</NavLink>
        </li>
          {auth
          ? (<>
              <li className={`${style.menuItem} breadcrumb-item`}>
                <NavLink to={"/profil"} className={({ isActive }) => isActive ? activeClassName : undefined}>Mój profil</NavLink>
              </li>
              <li className={`${style.menuItem} breadcrumb-item`}>
                <a href="#" onClick={logout}>Wyloguj</a>
              </li>
            </>
            )
          : (<li className={`${style.menuItem} breadcrumb-item`}>
              <a href="#" onClick={login}>Zaloguj</a>
            </li>)
          }
      </ol>
    </div>
  );
}

export default Menu;