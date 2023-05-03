import { Dispatch } from 'react'
import { IUser } from '../../interfaces/user'

export interface AuthProviderProps {
	children: React.ReactNode
}

export interface AuthContextTypes {
	state: ReducerState
	dispatch: Dispatch<ReducerAction>
}

export interface ReducerState {
	user: IUser | null
}

export type ReducerAction =
	| {
			type: 'LOGIN'
			payload: IUser
	  }
	| {
			type: 'LOGOUT'
	  }
