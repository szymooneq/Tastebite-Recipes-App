import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";

export default function useAuth() {
  const authContext = useContext(AuthContext)

  const auth = authContext.isAuthenticated
  useDebugValue(auth ? 'Zalogowany' : 'Wylogowany');

  const setAuth = (value) => {
    if (value) {
      //login
      authContext.login()
    } else {
      //logout
      authContext.logout()
    } 
  }

  return [auth, setAuth]
}