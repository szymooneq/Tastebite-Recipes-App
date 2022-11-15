import { Link, NavLink } from "react-router-dom"

export default function NavItem({ type, href, onClick, children }) {
  switch (type) {
    case "end":
      return (
        <NavLink
          end
          to={href}
          className={({ isActive }) =>
            `py-2 px-4 rounded ${
              isActive
                ? "text-white bg-green-700"
                : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            }`
          }>
          {children}
        </NavLink>
      )

    case "logout":
      return (
        <Link
          to={"/"}
          onClick={onClick}
          className="py-2 px-4 rounded cursor-pointer text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700">
          Wyloguj
        </Link>
      )

    default:
      return (
        <NavLink
          to={href}
          className={({ isActive }) =>
            `py-2 px-4 rounded ${
              isActive
                ? "text-white bg-green-700"
                : "text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
            }`
          }>
          {children}
        </NavLink>
      )
  }
}
