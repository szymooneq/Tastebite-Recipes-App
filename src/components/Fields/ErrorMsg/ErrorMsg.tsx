import { ErrorMsgProps } from './ErrorMsg.types'

const ErrorMsg = ({ content, isTouched }: ErrorMsgProps) => {
	if (!content || !isTouched) return null

	return (
		<p className="mt-2 text-sm text-center font-semibold text-red-600 dark:text-red-500">
			{content}
		</p>
	)
}
export default ErrorMsg
