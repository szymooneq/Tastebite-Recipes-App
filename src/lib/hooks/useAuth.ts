import { useCallback, useContext } from 'react'
import { AuthContext } from '@/lib/context/Auth/AuthProvider'
import { IUser } from '@/lib/types/User.types'

export const useAuth = () => {
	const { state, dispatch } = useContext(AuthContext)
	const { user } = state

	if (!AuthContext) {
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
		user,
		loginUser,
		logoutUser
	}
}
