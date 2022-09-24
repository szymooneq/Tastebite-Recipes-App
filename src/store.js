import { configureStore } from "@reduxjs/toolkit"

const initialState = {
  theme: 'info',
  user: JSON.parse(window.localStorage.getItem('token-data')) ?? null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'change-theme':
      const theme = state.theme === 'danger' ? 'primary' : 'danger'
      return { ...state, theme }
    case 'login':
      return { ...state, user: action.user }
    case 'logout':
      return { ...state, user: null }
    default:
      return state
  }
}

const store = configureStore({
  reducer
})

export default store