import { ReducerAction, ReducerState } from './Theme.types'

const themeDefaultState: ReducerState = document.documentElement.classList.contains('dark')
	? 'dark'
	: 'light'

const themeReducer = (state: ReducerState, action: ReducerAction) => {
	const { type } = action

	switch (type) {
		case 'SWITCH_THEME':
			const newState = state === 'dark' ? 'light' : 'dark'

			localStorage.setItem('theme', JSON.stringify(newState))

			document.documentElement.classList.remove(state)
			document.documentElement.classList.add(newState)

			return newState

		default:
			return state
	}
}

export { themeReducer, themeDefaultState }
