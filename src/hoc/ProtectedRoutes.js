import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/authContext"

export default function ProtectedRoutes() {
  const authContext = useContext(AuthContext)
  return authContext.isAuthenticated ? <Outlet /> : <Navigate to={'/zaloguj'} />
}