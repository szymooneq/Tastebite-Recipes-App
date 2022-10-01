export const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'danger' ? 'primary' : 'danger'
      return { ...state, theme }
    case 'login':
      window.localStorage.setItem('token-data', JSON.stringify(action.user));
      return { ...state, user: action.user }
    case 'logout':
      window.localStorage.removeItem('token-data');
      return { ...state, user: null }
    default:
      throw new Error('Nie ma takiej akcji: ' + action.type)
  }
}

export const initialState = {
  theme: 'danger',
  user: JSON.parse(window.localStorage.getItem('token-data')) ?? null
}
