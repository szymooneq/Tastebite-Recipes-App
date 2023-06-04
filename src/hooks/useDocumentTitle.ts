import { useEffect, useState } from 'react'

export const useDocumentTitle = (title: string) => {
	const [state, setState] = useState(title)

	const setTitle = (value: string) => {
		setState(value)
	}

	useEffect(() => {
		document.title = state
	}, [state])

	return { setTitle }
}
