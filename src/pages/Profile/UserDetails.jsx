import { useFormik } from "formik"
import { useContext, useState } from "react"
import Field from "../../components/Forms/Fields/Field"
import Alert from "../../components/UI/Alert/Alert"
import LoadingButton from "../../components/UI/LoadingButton/LoadingButton"
import authContext from "../../context/authContext"
import useDocumentTitle from "../../lib/hooks/useDocumentTitle"
import { registerSchema } from "../../lib/schemas/schemas"

// TODO: profile update information

export default function UserDetails() {
  useDocumentTitle("Profil | Edycja profilu")
  const { user, login } = useContext(authContext)
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
      /* try {
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
      } */
      setLoading(false)
    }
  })

  return (
    <div className="mx-7 md:mx-auto md:w-96">
      {message && <Alert message={message.info} theme={message.theme} />}

      <form onSubmit={handleSubmit}>
        <Field
          label="Email"
          type="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          touch={touched.email}
          placeholder="Podaj adres e-mail..." />

        <Field
          label="Nowe hasło"
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          touch={touched.password}
          placeholder="Podaj hasło..." />

        <Field
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