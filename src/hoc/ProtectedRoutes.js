import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AuthContext from "../context/authContext"
import ReducerContext from "../context/reducerContext"

export default function ProtectedRoutes() {
  const context = useContext(ReducerContext)

  return context.state.user ? <Outlet /> : <Navigate to={'/zaloguj'} />
}