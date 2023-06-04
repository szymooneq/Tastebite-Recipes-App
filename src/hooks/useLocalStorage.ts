import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, defaultValue: T) => {
	const [value, setValue] = useState(() => {
		const storageValue = window.localStorage.getItem(key)

		return storageValue ? JSON.parse(storageValue) : defaultValue
	})

	const changeValue = (newValue: T) => {
		setValue(newValue)
	}

	useEffect(() => {
		const currentValue = window.localStorage.getItem(key)

		if (currentValue !== value) {
			window.localStorage.setItem(key, JSON.stringify(value))
		}
	}, [value])

	return { value, changeValue }
}
