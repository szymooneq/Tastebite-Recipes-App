import React, { useReducer } from 'react'
import AuthContext from '../../context/authContext'
import { initialState, reducer } from '../../context/reducer'
import ThemeContext from '../../context/themeContext'

export default function ContextLayout (props) {
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
