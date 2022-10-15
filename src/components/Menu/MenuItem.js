import { NavLink } from "react-router-dom";

export default function MenuItem(props) {
  return (
    props.end ? (
      <li>
        <NavLink
          end="true"
          to={props.link}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-green-700 py-2 px-4 rounded dark:text-white"
              : "text-gray-700 hover:bg-gray-200 py-2 px-4 rounded dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          }
        >
          {props.children}
        </NavLink>
      </li>
    ) : (
      <li>
        <NavLink
          to={props.link}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-green-700 py-2 px-4 rounded dark:text-white"
              : "text-gray-700 hover:bg-gray-200 py-2 px-4 rounded dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
          }
        >
          {props.children}
        </NavLink>
      </li>
    )
      
    )
    ;
}
