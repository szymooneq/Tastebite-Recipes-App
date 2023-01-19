import { IUser } from './user';

export interface IAppContext {
	state: ReducerState;
	changeTheme: () => void;
	login: (user: IUser) => void;
	logout: () => void;
}

export interface ReducerState {
	theme: string;
	user: IUser | null;
}

export type ReducerAction =
	| {
			type: 'changeTheme';
	  }
	| {
			type: 'login';
			payload: IUser;
	  }
	| {
			type: 'logout';
	  };
