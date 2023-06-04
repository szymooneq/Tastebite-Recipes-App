export interface DynamicProps {
	name: string
	placeholder: string
	listType: string
	errorMsg: string | Array<string> | undefined
	value: Array<string>
	setValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}
