import { useState, useEffect } from "react"
import axios from "../../../axios-auth"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import useAuth from "../../../hooks/useAuth"
import { loginSchema } from "../../../schemas/formSchemas"
import Input from "../../../components/Input/Input"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import Alert from "../../../components/UI/Alert"

export default function Login(props) {
  const [auth, setAuth] = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const res = await axios.post('accounts:signInWithPassword', {
          email: values.email,
          password: values.password,
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
        //console.log(ex.response.data.error.message)
        setLoading(false)
        setMessage(ex.response.data.error.message)
      }
    }
  })

  useEffect(() => {if(auth) navigate('/')})

  return (
    <>
      <h2 className="p-5 text-3xl font-bold text-center">Logowanie</h2>
      {message && <Alert message={message} theme="danger" />}
      
      <form onSubmit={handleSubmit}>  
        <Input
          label="Email"
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touch={touched.email}
          placeholder="Podaj adres e-mail..." />

        <Input
          label="Hasło"
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touch={touched.password}
          placeholder="Podaj adres hasło..." />

        <div className="text-center">
          <LoadingButton 
            disabled={(errors?.email || errors?.password) && true} 
            loading={loading} 
            loadingMessage="Logowanie...">Zaloguj</LoadingButton>
        </div>
      </form>
    </>
  )
}