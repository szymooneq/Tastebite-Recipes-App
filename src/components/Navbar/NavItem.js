import { NavLink } from "react-router-dom";

export default function NavItem(props) {
  return props.end ? (
      <NavLink
        end
        to={props.link}
        className={({ isActive }) => `py-2 px-4 rounded ${isActive ? "text-white bg-green-700" : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"}`}>
        {props.children}
      </NavLink>
    ) : (
      <NavLink
        to={props.link}
        className={({ isActive }) => `py-2 px-4 rounded ${isActive ? "text-white bg-green-700" : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"}`}>
        {props.children}
      </NavLink>
    )
}
