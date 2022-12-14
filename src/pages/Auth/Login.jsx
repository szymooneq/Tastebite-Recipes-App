import { signInWithEmailAndPassword } from "firebase/auth"
import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Field from "../../components/Forms/Fields/Field"
import Alerts from "../../components/UI/Alerts"
import LoadingButton from "../../components/UI/LoadingButton/LoadingButton"
import AuthContext from "../../context/AuthContext"
import { auth } from "../../firebase"
import useDocumentTitle from "../../lib/hooks/useDocumentTitle"
import { loginSchema } from "../../lib/schemas/schemas"

export default function Login() {
  useDocumentTitle("Logowanie | Tastebite Recipe App")
  const { user, login } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
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
          setError(error.message)
          setLoading(false)
        })
    }
  })

  return (
    <div className="mx-7 md:mx-auto md:w-96">
      <h2 className="p-5 text-3xl font-bold text-center dark:text-white">Logowanie</h2>
      {error && <Alerts message={error} type="danger" />}
      
      <form onSubmit={handleSubmit}>  
        <Field
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touch={touched.email}
          placeholder="Podaj adres e-mail..." />

        <Field
          label="Has??o"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touch={touched.password}
          placeholder="Podaj adres has??o..." />

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