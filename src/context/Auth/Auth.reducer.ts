import { ReducerAction, ReducerState } from './Auth.types'

const STORAGE_DATA = window.localStorage.getItem('token-data')

const authDefaultState: ReducerState = {
	user: STORAGE_DATA ? JSON.parse(STORAGE_DATA) : null
}

const authReducer = (state: ReducerState, action: ReducerAction) => {
	const { type } = action

	switch (type) {
		case 'LOGIN':
			window.localStorage.setItem('token-data', JSON.stringify(action.payload))
			return { ...state, user: action.payload }

		case 'LOGOUT':
			window.localStorage.removeItem('token-data')
			return { ...state, user: null }

		default:
			return state
	}
}

export { authReducer, authDefaultState }
