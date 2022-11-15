import React from "react";

const authContext = React.createContext({
  user: '',
  login: () => {},
  logout: () => {}
})

// authContext.displayName = 'authContext'

export default authContext