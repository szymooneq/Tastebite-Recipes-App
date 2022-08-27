import React from "react";
import style from './Menu.module.css';

function Menu() {
  return (
    <div className={`${style.menuContainer} container`}>
      <ul className={style.menu}>
        <li className={style.menuItem}>
          <a href="#">Home</a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;