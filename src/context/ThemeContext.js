import React from "react";

const themeContext = React.createContext({
  theme: '',
  changeMode: () => {}
})

// themeContext.displayName = 'themeContext'

export default themeContext
