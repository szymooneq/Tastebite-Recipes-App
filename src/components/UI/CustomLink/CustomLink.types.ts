export interface CustomLinkProps {
	ariaLabel?: string
	href: string
	color: 'green' | 'red' | 'blue' | 'gray' | 'redOutline' | 'greenOutline' | 'blueOutline'
	children: React.ReactNode
}
