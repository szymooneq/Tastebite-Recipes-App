import { useState, useContext } from "react"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import useAuth from "../../../hooks/useAuth"
import axios from "../../../axios-auth"
import { useFormik } from "formik"
import { registerSchema } from "../../../schemas/formSchemas"
import AuthContext from "../../../context/authContext"
import Input from "../../../components/Input/Input"
import Alert from "../../../components/UI/Alert"

export default function ProfileDetails() {
  const context = useContext(AuthContext)
  const [auth, setAuth] = useAuth()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({})

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: context.user.email,
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const res = await axios.post('accounts:update', {
          idToken: auth.token,
          email: values.email,
          password: values.password,
          returnSecureToken: true
        })
        setAuth({
          email: res.data.email,
          token: res.data.idToken,
          userId: res.data.localId
        })
        setMessage({info: "Dane zostały zaktualizowane!", theme: "success"})
      } catch (ex) {
        //console.log(ex.response)
        setMessage({info: ex.response.data.error.message, theme: "danger"})
      }
      setLoading(false)
    }
  })

  return (
    <>
      {message && <Alert message={message.info} theme={message.theme} />}

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
          label="Nowe hasło"
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touch={touched.password}
          placeholder="Podaj hasło..." />

        <Input
          label="Potwierdź nowe hasło"
          type="password"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
          touch={touched.confirmPassword}
          placeholder="Potwierdź hasło..." />

        <div className="text-center">
          <LoadingButton 
            disabled={(errors?.email || errors?.password || errors?.confirmPassword) && true} 
            loading={loading} 
            loadingMessage="Aktualizacje...">Zaktualizuj dane</LoadingButton>
        </div>
      </form>
    </>
  )
}