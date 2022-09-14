import style from './Menu.module.css';
import useAuth from "../../hooks/useAuth";

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

  return (
    <div className={style.menuContainer}>
      <ol className={`${style.menu} breadcrumb`}>
        <li className={`${style.menuItem} breadcrumb-item`}>
          <a href="#">Home</a>
        </li>
          {auth
          ? (<li className={`${style.menuItem} breadcrumb-item`}>
              <a href="#" onClick={logout}>Wyloguj</a>
            </li>)
          : (<li className={`${style.menuItem} breadcrumb-item`}>
              <a href="#" onClick={login}>Zaloguj</a>
            </li>)
          }
      </ol>
    </div>
  );
}

export default Menu;