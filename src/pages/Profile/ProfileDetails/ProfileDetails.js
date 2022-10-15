import { useFormik } from "formik"
import { useContext, useState } from "react"
import Input from "../../../components/Input/Input"
import Alert from "../../../components/UI/Alert/Alert"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import AuthContext from "../../../context/AuthContext"
import axios from "../../../firebase/axios-auth"
import { registerSchema } from "../../../schemas/formSchemas"

export default function ProfileDetails() {
  const { user, login } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: user.email,
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const res = await axios.post('accounts:update', {
          idToken: user.token,
          email: values.email,
          password: values.password,
          returnSecureToken: true
        })
        login({
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
    <div className="mx-auto md:w-96">
      {message && <Alert message={message.info} theme={message.theme} />}

      <form className="mx-3" onSubmit={handleSubmit}>
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
    </div>
  )
}