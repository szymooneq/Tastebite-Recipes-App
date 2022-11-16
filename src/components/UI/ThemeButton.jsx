import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useContext } from "react"
import themeContext from "../../context/themeContext"

export default function ThemeButton() {
  const { theme, changeMode } = useContext(themeContext)

  return (
    <button 
      className="p-2 text-sm rounded-lg border text-gray-900 bg-gray-50 border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
      onClick={() => changeMode()}>
        {theme === "light" ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
    </button>
  )
}