import { Dispatch } from 'react'

export interface ThemeProviderProps {
	children: React.ReactNode
}

export interface ThemeContextTypes {
	state: ReducerState
	dispatch: Dispatch<ReducerAction>
}

export type ReducerState = 'dark' | 'light'

export type ReducerAction = {
	type: 'SWITCH_THEME'
}
