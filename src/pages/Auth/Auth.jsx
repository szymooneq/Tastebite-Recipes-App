import { useContext } from "react"
import { Navigate } from "react-router-dom"
import authContext from "../../context/authContext"

export default function Auth({ children }) {
  const { user } = useContext(authContext)
  return user ? <Navigate to="/" /> : children
}
