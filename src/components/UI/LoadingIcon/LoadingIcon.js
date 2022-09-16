import { useContext } from "react"
import ThemeContext from "../../../context/themeContext"

export default function LoadingIcon() {
  const theme = useContext(ThemeContext)

  return (
    <div className="d-flex justify-content-center">
      <div className={`spinner-border m-5 text-${theme.color}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    
  )
}