import { useContext } from "react"
import { Navigate } from "react-router-dom"
import AuthContext from "../../context/authContext"

export default function Auth({ children }) {
  const { user } = useContext(AuthContext)
  return user ? <Navigate to="/" /> : children
}
