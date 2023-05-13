export interface FileProps {
	name: string
	label: string
	errorMsg: string | undefined
	currentImg: string | null
	value: Blob | null
	setValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}
