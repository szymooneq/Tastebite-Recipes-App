import { IndicatorProps } from './Indicator.types'

const background = {
	green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
	red: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
}

const text = {
	green: 'bg-green-500',
	red: 'bg-red-500'
}

const Indicator = ({ color, children }: IndicatorProps): JSX.Element => (
	<span
		className={`mr-2 px-2.5 py-0.5 inline-flex items-center text-xs font-medium rounded-full ${background[color]}`}>
		<span className={`w-2 h-2 mr-1 rounded-full ${text[color]}`}></span>
		{children}
	</span>
)

export default Indicator
