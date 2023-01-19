import { createContext, useReducer } from 'react';
import { IAppContext, ReducerState } from '../interfaces/context';
import { IUser } from '../interfaces/user';
import { appReducer } from './appReducer';

export const Context = createContext({} as IAppContext);

interface props {
	children: React.ReactNode;
}

const INITIAL_STATE: ReducerState = {
	theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
	user: JSON.parse(window.localStorage.getItem('token-data')!) ?? null
};

function AppContext({ children }: props): JSX.Element {
	const [state, dispatch] = useReducer(appReducer, INITIAL_STATE);

	const changeTheme = () => {
		dispatch({ type: 'changeTheme' });
	};

	const login = (user: IUser) => {
		dispatch({ type: 'login', payload: user });
	};

	const logout = () => {
		dispatch({ type: 'logout' });
	};

	return (
		<Context.Provider value={{ state, changeTheme, login, logout }}>
			{children}
		</Context.Provider>
	);
}

export default AppContext;
