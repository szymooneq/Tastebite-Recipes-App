import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Alert from "../../../components/UI/Alert/Alert";
import AlertRegister from "../../../components/UI/Alert/AlertRegister";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import AuthContext from "../../../context/AuthContext";
import axios from "../../../firebase/axios-auth";
import { registerSchema } from "../../../schemas/formSchemas";

export default function Register(props) {
  const { user, login} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true)
      try {
        const res = await axios.post('accounts:signUp', {
          email: values.email,
          password: values.password,
          returnSecureToken: true
        })
        login({
          email: res.data.email,
          token: res.data.idToken,
          userId: res.data.localId
        })
        setSuccess(true)
        setTimeout(() => {navigate('/')}, 5000)
      } catch (ex) {
        setLoading(false)
        setMessage(ex.response.data.error.message)
      }
    }
  })

  useEffect(() => {
    if(user) navigate('/')
  })

  return (
    success ? <AlertRegister /> : (
      <>
        <h2 className="p-5 text-3xl font-bold text-center">Rejestracja</h2>
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
            placeholder="Podaj hasło..." />

          <Input
            label="Potwierdź hasło"
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
              loadingMessage="Rejestrowanie...">Zarejestruj</LoadingButton>
          </div>
        </form>
      </>
    )
  )
}