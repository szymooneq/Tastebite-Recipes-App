export interface DynamicInputProps extends React.HtmlHTMLAttributes<HTMLInputElement> {
	index: number
	name: string
	errorMsg: string | undefined
	value: string
	changeValue: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
	deleteValue: (index: number) => void
}
