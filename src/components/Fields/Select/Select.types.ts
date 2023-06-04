export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	name: string
	label: string
	errorMsg: string | undefined
	isTouched: boolean | undefined
}
