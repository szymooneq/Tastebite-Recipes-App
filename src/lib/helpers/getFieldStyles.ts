export const getFieldStyles = (errorMsg: string | undefined, isTouched: boolean | undefined) => {
	const isValid = !errorMsg || !isTouched

	const fieldStyle = isValid
		? 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
		: 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'

	const labelStyle = isValid ? 'text-gray-900 dark:text-gray-300' : 'text-red-700 dark:text-red-500'

	const markerStyle = isValid
		? 'marker:text-gray-900 marker:dark:text-gray-300'
		: 'marker:text-red-900 marker:dark:text-red-500'

	return { fieldStyle, labelStyle, markerStyle }
}
