import { ButtonProps } from './Button.types'
import * as icon from '../../../assets/svg'

const baseStyle =
	'px-5 py-2.5 inline-flex items-center w-max rounded-lg text-sm text-center focus:outline-none font-bold'

const variants = {
	green:
		'text-white bg-green-700 focus:ring-green-300 dark:bg-green-600 dark:focus:ring-green-800 hover:bg-green-800 dark:hover:bg-green-700',
	red: 'text-white bg-red-700 focus:ring-red-300 dark:bg-red-600 dark:focus:ring-red-800 hover:bg-red-800 dark:hover:bg-red-700',
	blue: 'text-white bg-blue-700 focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 hover:bg-blue-800 dark:hover:bg-blue-700',
	gray: 'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
	redOutline:
		'text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-rose-300 dark:border-rose-500 dark:text-rose-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-rose-900',
	greenOutline:
		'text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-900',
	blueOutline:
		'text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900'
}

const allowedState = 'focus:ring-4'
const disabledState = 'cursor-not-allowed opacity-75'

const Button = ({
	color,
	children,
	disabled,
	isLoading,
	loadingMsg,
	...rest
}: ButtonProps): JSX.Element => (
	<button
		className={`${baseStyle} ${disabled ? disabledState : allowedState} ${variants[color]}`}
		{...rest}>
		{loadingMsg && isLoading ? (
			<>
				{icon.buttonSpinner}
				{loadingMsg}
			</>
		) : (
			children
		)}
	</button>
)

export default Button
