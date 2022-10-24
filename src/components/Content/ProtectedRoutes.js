import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

export default function ProtectedRoutes() {
  const context = useContext(AuthContext)
  
  return context.user ? <Outlet /> : <Navigate to={'/logowanie'} />
}