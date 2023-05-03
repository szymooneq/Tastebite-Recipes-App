import { toggleTheme } from '../../helpers/toggleTheme'
import { ReducerAction, ReducerState } from './Theme.types'

const themeDefaultState: ReducerState = document.documentElement.classList.contains('dark')
	? 'dark'
	: 'light'

const themeReducer = (state: ReducerState, action: ReducerAction) => {
	const { type } = action

	switch (type) {
		case 'SWITCH_THEME':
			return toggleTheme(state)

		default:
			return state
	}
}

export { themeReducer, themeDefaultState }
