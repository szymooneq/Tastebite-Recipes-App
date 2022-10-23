import { signInWithEmailAndPassword } from "firebase/auth"
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../../components/Input/Input"
import Alert from "../../../components/UI/Alert/Alert"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import AuthContext from "../../../context/AuthContext"
import { auth } from "../../../firebase"
import { loginSchema } from "../../../schemas/formSchemas"

export default function Login() {
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
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user
          login(user)
          navigate('/')
        })
        .catch((error) => {
          // console.log(error.code)
          setMessage(error.message)
          setLoading(false)
        })
    }
  })

  // TODO: prevent open on auth
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