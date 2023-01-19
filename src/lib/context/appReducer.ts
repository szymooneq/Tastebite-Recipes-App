import { ReducerAction, ReducerState } from '../interfaces/context';

export const appReducer = (state: ReducerState, action: ReducerAction) => {
	switch (action.type) {
		case 'changeTheme':
			const newValue = state.theme === 'dark' ? 'light' : 'dark';
			document.documentElement.classList.remove(state.theme);
			document.documentElement.classList.add(newValue);
			window.localStorage.setItem('theme', newValue);
			return { ...state, theme: newValue };
		case 'login':
			window.localStorage.setItem('token-data', JSON.stringify(action.payload));
			return { ...state, user: action.payload };
		case 'logout':
			window.localStorage.removeItem('token-data');
			return { ...state, user: null };
		default:
			return { ...state };
	}
};
