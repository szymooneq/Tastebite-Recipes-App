import { MoonIcon, SunIcon } from '@heroicons/react/20/solid'
import { useTheme } from '@/hooks/useTheme'

const baseStyles =
	'p-2 text-sm rounded-lg border text-gray-900 bg-gray-50 border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'

const ThemeButton = (): JSX.Element => {
	const { theme, changeTheme } = useTheme()

	return (
		<button aria-label="Zmień motyw aplikacji" className={baseStyles} onClick={() => changeTheme()}>
			{theme === 'dark' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
		</button>
	)
}

export default ThemeButton
