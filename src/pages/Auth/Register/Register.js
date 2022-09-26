import { useEffect, useState } from "react";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import Input from "../../../components/Input/Input";
import { validate } from "../../../helpers/validations";
import axios from "../../../axios-auth"
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from "react-router-dom";
import InputT from "../../../components/UI/InputT"


export default function Register(props) {
  const [auth, setAuth] = useAuth()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const valid = !Object.values(form)
    .map(input => input.error)
    .filter(error => error)
    .length

  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('accounts:signUp', {
        email: form.email,
        password: form.password,
        returnSecureToken: true
      });

      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId
      })
      navigate('/')
      
    } catch (ex) {
      //TODO validation error
      setError(ex.response.data.error.message)
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }

  useEffect(() => {
    if(auth) navigate('/')
  }, [])

  return (
    <>
      <h2 className="p-5 text-3xl font-bold text-center">Rejestracja</h2>

      <form onSubmit={submit}>
      <InputT    
        id="email"
        label="Email"
        error={valid?.login}
        type="email"
        value={form.email}
        onChange={(val) => setForm({...form, email: val })}
        placeholder="Wprowadź login..." />

      <InputT
        id="password"
        label="Hasło"
        error={valid?.password}
        type="password"
        value={form.password}
        onChange={(val) => setForm({...form, password: val })}
        placeholder="Wprowadź hasło..." />

        {error ?? <div className="alert alert-danger">{error}</div>}

        <div className="text-center">
          <LoadingButton loading={loading}>Zarejestruj</LoadingButton>
        </div>
      </form>
    </>
  )
}