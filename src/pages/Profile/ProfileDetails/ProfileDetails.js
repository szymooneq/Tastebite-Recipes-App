import { useEffect, useState } from "react"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import { validateEmail } from "../../../helpers/validations"
import useAuth from "../../../hooks/useAuth"
import axios from "../../../axios-auth"
import InputT from "../../../components/UI/InputT"

export default function ProfileDetails() {
  const [auth, setAuth] = useAuth()
  const [email, setEmail] = useState(auth.email)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  const [success, setSuccess] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        idToken: auth.token,
        email,
        returnSecureToken: true
      }
      if (password) data.password = password

      const res = await axios.post('accounts:update', data)

      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId
      })
      setSuccess(true)

    } catch (ex) {
      console.log(ex.response)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (validateEmail(email)) {
      setErrors({...errors, email: ''})
    } else {
      setErrors({...errors, email: 'Niepoprawny email'})
    }
  }, [email])

  useEffect(() => {
    if (password.length >= 4 || password.length === 0) {
      setErrors({...errors, password: ''})
    } else {
      setErrors({...errors, password: 'Wymagane 4 znaki'})
    }
  }, [password])

  return (
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

      <InputT
        id="email"
        label="Email"
        error={errors.email}
        type="email"
        value={email}
        onChange={(val) => setEmail(val)}
        placeholder="Wprowadź email do edycji..." />

      <InputT
        id="password"
        label="Hasło"
        error={errors.password}
        type="password"
        value={password}
        onChange={(val) => setPassword(val)}
        placeholder="Wprowadź hasło do edycji..." />

      <div className="text-center">
        <LoadingButton loading={loading}>Zapisz</LoadingButton>
      </div>
    </form>
  )
}