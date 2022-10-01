import React from "react";

const ThemeContext = React.createContext({
  dark: true,
  //changeDark: ThemeContext.dark === true ? false : true
})
ThemeContext.displayName = 'ThemeContext'

export default ThemeContext
