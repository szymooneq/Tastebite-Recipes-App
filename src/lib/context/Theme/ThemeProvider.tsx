import { createContext, useReducer } from 'react'
import { ThemeContextTypes, ThemeProviderProps } from './Theme.types'
import { themeDefaultState, themeReducer } from './Theme.reducer'

export const ThemeContext = createContext({} as ThemeContextTypes)

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(themeReducer, themeDefaultState)

	return <ThemeContext.Provider value={{ state, dispatch }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
