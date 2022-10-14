import React from "react";

const ThemeContext = React.createContext({
  theme: '',
  changeMode: () => {}
})
ThemeContext.displayName = 'ThemeContext'

export default ThemeContext
