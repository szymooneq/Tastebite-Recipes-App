import { useCallback, useContext } from 'react'
import { AuthContext } from '@/context/Auth/AuthProvider'
import { IUser } from '@/types/User.types'

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext)

	if (!state && !dispatch) {
		throw new Error('useAuth should be used inside AuthProvider')
	}

	const loginUser = useCallback(
		(user: IUser) => {
			dispatch({ type: 'LOGIN', payload: user })
		},
		[dispatch]
	)

	const logoutUser = useCallback(() => {
		dispatch({ type: 'LOGOUT' })
	}, [dispatch])

	return {
		user: state.user,
		loginUser,
		logoutUser
	}
}
