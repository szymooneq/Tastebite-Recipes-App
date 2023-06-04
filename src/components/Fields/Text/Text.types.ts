export interface TextProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string
	label: string
	errorMsg: string | undefined
	isTouched: boolean | undefined
}
