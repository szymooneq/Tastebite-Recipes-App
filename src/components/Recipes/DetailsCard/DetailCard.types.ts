export interface DetailCardProps {
	color: 'amber' | 'rose' | 'blue'
	title: string
	content?: ContentType
	list?: ListType
}

export type ContentType = Array<{ title: string; description: string }>
export type ListType = Array<string>
