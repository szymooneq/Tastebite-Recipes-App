export interface ButtonProps {
	ariaLabel?: string
	type: 'submit' | 'button'
	color: 'green' | 'red' | 'blue' | 'gray' | 'redOutline' | 'greenOutline' | 'blueOutline'
	disabled: boolean
	children: React.ReactNode
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}
