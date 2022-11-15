import React, { useReducer } from "react"
import authContext from "../../context/authContext"
import { initialState, reducer } from "../../context/reducer"
import themeContext from "../../context/themeContext"

export default function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <authContext.Provider
      value={{
        user: state.user,
        login: (user) => dispatch({ type: "login", user }),
        logout: () => dispatch({ type: "logout" })
      }}>
      <themeContext.Provider
        value={{
          theme: state.theme,
          changeMode: () => dispatch({ type: "changeTheme" })
        }}>
        {children}
      </themeContext.Provider>
    </authContext.Provider>
  )
}
