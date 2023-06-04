export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	color: 'green' | 'red' | 'blue' | 'gray' | 'redOutline' | 'greenOutline' | 'blueOutline'
	children: React.ReactNode
	loadingMsg?: string
	isLoading?: boolean
}
