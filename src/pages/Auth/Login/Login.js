import { useState, useEffect } from "react"
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import axios from "../../../axios-auth"

export default function Login(props) {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [valid, setValid] = useState(null)
  const [error, setError] = useState('')
  
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post('accounts:signInWithPassword', {
        email,
        password,
        returnSecureToken: true
      })
      console.log(res)

      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId
      })
      navigate('/')
    } catch (ex) {
      setError(ex.response.data.error.message)
      setLoading(false)
      console.log(ex.response)
    }

    

    /* setTimeout(() => {
      //logowanie
      if (true) {
        setAuth(true)
        navigate('/')
      } else {
        setValid(false)
      }
      
      setPassword('')
    }, 500) */
  }

  useEffect(() => {
    if(auth) navigate('/')
  }, [])

  return (
    <div>
      <h2>Logowanie</h2>

      {valid === false ? (<div className="alert alert-danger">Niepoprawne dane logowania</div>) : null}
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input 
            type="email" 
            id="email-input"
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="password-input">Hasło</label>
          <input 
            type="password" 
            id="password-input"
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="form-control" />
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : null}

        <LoadingButton loading={loading}>Zaloguj</LoadingButton>
      </form>
    </div>
  )
}