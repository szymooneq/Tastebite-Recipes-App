import { useContext } from "react"
import ThemeContext from "../../../context/themeContext"

function Footer() {
  const theme = useContext(ThemeContext)
  return (
    <div className={`m-3 text-center text-${theme.color}`}>
      Created by Szymon Dudka | 2022
    </div>
  )
}

export default Footer