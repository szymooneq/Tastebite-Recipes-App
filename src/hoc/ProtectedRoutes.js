import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/authContext"

export default function ProtectedRoutes() {
  const context = useContext(AuthContext)
  return context.user ? <Outlet /> : <Navigate to={'/zaloguj'} />
  //const context = useContext(ReducerContext)
  //return context.state.user ? <Outlet /> : <Navigate to={'/zaloguj'} />
}