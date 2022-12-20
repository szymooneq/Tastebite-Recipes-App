import React, { useReducer } from "react";
import AuthContext from "../../context/AuthContext";
import { initialState, reducer } from "../../context/Reducer";
import ThemeContext from "../../context/ThemeContext";

export default function ContextLayout({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login: (user) => dispatch({ type: "login", user }),
        logout: () => dispatch({ type: "logout" })
      }}>
      <ThemeContext.Provider
        value={{
          theme: state.theme,
          changeMode: () => dispatch({ type: "changeTheme" })
        }}>
        {children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
