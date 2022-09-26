import { useState, useEffect } from "react"
import useAuth from "../../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import axios from "../../../axios-auth"
import InputT from "../../../components/UI/InputT"

export default function Login(props) {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [valid, setValid] = useState({
    login: '',
    password: ''
  })
  
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
      switch(ex.response.data.error.message) {
        case 'EMAIL_NOT_FOUND':
          setValid({...valid, login: "Nie ma takiego adresu e-mail"})
          break
        case 'INVALID_EMAIL':
          setValid({...valid, login: "Wprowadź adres e-mail"})
          break
        case 'MISSING_EMAIL':
          setValid({...valid, login: "Wprowadź adres e-mail"})
          break
        case 'INVALID_PASSWORD':
          setValid({...valid, password: "Błędne hasło"})
          break
        case 'MISSING_PASSWORD':
          setValid({...valid, password: "Wprowadź hasło"})
          break
        case 'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.':
          setValid({...valid, password: "debil"})
          break
      }
      setLoading(false)
      console.log(ex.response)
    }
  }

  useEffect(() => {
    if(auth) navigate('/')
  }, [])

  return (
    <>
      <h2 className="p-5 text-3xl font-bold text-center">Logowanie</h2>

      <form onSubmit={submit}>
        <InputT    
        id="email"
        label="Email"
        error={valid?.login}
        type="email"
        value={email}
        onChange={(val) => setEmail(val)}
        placeholder="Wprowadź login..." />

      <InputT
        id="password"
        label="Hasło"
        error={valid?.password}
        type="password"
        value={password}
        onChange={(val) => setPassword(val)}
        placeholder="Wprowadź hasło..." />

        {error ?? <div className="alert alert-danger">{error}</div>}

      <div className="text-center">
        <LoadingButton loading={loading}>Zaloguj</LoadingButton>
      </div>
      </form>
    </>
  )

  /* return (
    <form onSubmit={submit}>
      {success ?
        <>
          <div className="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <p>Dane zostały zapisane.</p>
          </div>
        </>
        : null}     

      <div className="mx-auto mb-4 w-96">
        {errors.email 
          ? <label htmlFor="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Email</label>
          : <label htmlFor="success" className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Email</label>}
        <input 
          id="success" 
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)} 
          className={`block w-full p-2.5 border text-sm rounded-lg bg-green-50 border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-green-500 ${errors.email ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : ''}`} 
          placeholder="Wprowadź email do edycji..." />
          {errors.email 
            ? <p className="mt-2 text-sm text-red-600 dark:text-red-500 font-semibold">{errors.email}</p> 
            : <p className="mt-2 text-sm text-green-600 dark:text-green-500 font-semibold">Wszystko ok!</p>}
      </div>

      <div className="mx-auto mb-4 w-96">
      {errors.password 
          ? <label htmlFor="error" className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Hasło</label>
          : <label htmlFor="success" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hasło</label>}
        <input
          id="success" 
          type="password" 
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`border block w-full p-2.5 text-sm rounded-lg bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${errors.password ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500' : ''}`}
          placeholder="Wprowadź hasło do edycji..." />
          {errors.password ? <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-semibold">Błąd!</span> {errors.password}</p> : null}
      </div>

      <div className="text-center">
        <LoadingButton loading={loading}>Zapisz</LoadingButton>
      </div>
    </form>
  ) */
}