import { useContext } from "react"
import ThemeContext from "../../../context/themeContext"

function Footer() {
  const theme = useContext(ThemeContext)
  return (
    <div className={`m-3 text-center text-${theme.color}`}>
      noclegi 2022
    </div>
  )
}

export default Footer