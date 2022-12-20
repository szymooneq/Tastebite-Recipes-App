import { NavLink } from "react-router-dom";

export default function ProfileItem({ type, href, children }) {
  switch (type) {
    case "button":
      return (
        <li className="mr-2">
          <button className="p-4 inline-block rounded-t-lg border-b-2 active text-green-600 border-green-600 dark:text-green-500 dark:border-green-500">
            {children}
          </button>
        </li>
      );

    default:
      return (
        <li className="mr-2">
          <NavLink
            end
            to={href}
            className={({ isActive }) =>
              `inline-block p-4 rounded-t-lg border-b-2 ${
                isActive
                  ? "text-green-600 border-green-600 active dark:text-green-500 dark:border-green-500"
                  : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }`
            }>
            {children}
          </NavLink>
        </li>
      );
  }
}
