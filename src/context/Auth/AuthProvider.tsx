import { createContext, useReducer } from 'react'
import { authDefaultState, authReducer } from './Auth.reducer'
import { AuthContextTypes, AuthProviderProps } from './Auth.types'

export const AuthContext = createContext({} as AuthContextTypes)

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
	const [state, dispatch] = useReducer(authReducer, authDefaultState)

	return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthProvider
