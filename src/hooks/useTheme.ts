import { useCallback, useContext } from 'react'
import { ThemeContext } from '@/context/Theme/ThemeProvider'

export const useTheme = () => {
	const { state, dispatch } = useContext(ThemeContext)

	if (!state && !dispatch) {
		throw new Error('useTheme should be used inside ThemeProvider')
	}

	const changeTheme = useCallback(() => {
		dispatch({ type: 'SWITCH_THEME' })
	}, [dispatch])

	return { theme: state, changeTheme }
}
