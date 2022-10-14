import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import { initialState, reducer } from './Reducer'
import ThemeContext from './ThemeContext'

export default function AppContext (props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AuthContext.Provider value={{ 
      user: state.user,
      login: (user) => dispatch({ type: 'login', user }),
      logout: () => dispatch({ type: 'logout' })
    }}>
      <ThemeContext.Provider value={{
            theme: state.theme,
            changeMode: () => dispatch({ type: 'changeTheme' })
          }}>
        {props.children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
} 
