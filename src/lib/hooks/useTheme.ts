import { useCallback, useContext } from 'react'
import { ThemeContext } from '@/lib/context/Theme/ThemeProvider'

export const useTheme = () => {
	const { state, dispatch } = useContext(ThemeContext)
	const theme = state

	if (!ThemeContext) {
		throw new Error('useTheme should be used inside ThemeProvider')
	}

	const changeTheme = useCallback(() => {
		dispatch({ type: 'SWITCH_THEME' })
	}, [dispatch])

	return { theme, changeTheme }
}
