import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../../components/Input/Input"
import Alert from "../../../components/UI/Alert/Alert"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import AuthContext from "../../../context/AuthContext"
import axios from "../../../firebase/axios-auth"
import { loginSchema } from "../../../schemas/formSchemas"

export default function Login(props) {
  const { user, login } = useContext(AuthContext)
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
        login({
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

  useEffect(() => {if(user) navigate('/')})

  return (
    <div className="mx-7 md:mx-auto md:w-96">
      <h2 className="p-5 text-3xl font-bold text-center dark:text-white">Logowanie</h2>
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
    </div>
  )
}