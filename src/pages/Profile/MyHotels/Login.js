import { useState, useEffect } from "react"
import axios from "../../../axios-auth"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import useAuth from "../../../hooks/useAuth"
import { hotelSchema } from "../../../schemas"
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
      name: '',
      description: '',
      city: ''
    },
    validationSchema: hotelSchema,
    onSubmit: async (values) => {
      console.log(values.city)
    }
  })

  //useEffect(() => {if(auth) navigate('/')})

  return (
    <>
      <h2 className="p-5 text-3xl font-bold text-center">Logowanie</h2>
      {message && <Alert message={message} theme="danger" />}
      
      <form onSubmit={handleSubmit}>  
        <Input
          label="Nazwa"
          type="text"
          id="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
          touch={touched.name}
          placeholder="Podaj adres e-mail..." />

        <Input
          label="Miasto"
          type="text"
          id="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.city}
          touch={touched.city}
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