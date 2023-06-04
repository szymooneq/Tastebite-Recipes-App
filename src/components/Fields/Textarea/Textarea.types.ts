export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string
	label: string
	errorMsg: string | undefined
	isTouched: boolean | undefined
}
