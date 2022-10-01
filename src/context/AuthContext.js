import React from "react";

const AuthContext = React.createContext({
  user: '',
  login: () => {},
  logout: () => {}
})

AuthContext.displayName = 'AuthContext'

export default AuthContext