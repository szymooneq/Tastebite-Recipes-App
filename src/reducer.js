export const reducer = (state, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'danger' ? 'primary' : 'danger'
      return { ...state, theme }
    case 'login':
      return { ...state, isAuthenticated: true }
    case 'logout':
      return { ...state, isAuthenticated: false }
    default:
      throw new Error('Nie ma takiej akcji: ' + action.type)
  }
}

export const initialState = {
  theme: 'danger',
  isAuthenticated: true
}