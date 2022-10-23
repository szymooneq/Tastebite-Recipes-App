import { createUserWithEmailAndPassword } from "firebase/auth";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import Alert from "../../../components/UI/Alert/Alert";
import AlertRegister from "../../../components/UI/Alert/AlertRegister";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import AuthContext from "../../../context/AuthContext";
import { auth } from "../../../firebase";
import { registerSchema } from "../../../schemas/formSchemas";

export default function Register(props) {
  const { user, login} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  // TODO: Add user to firestore

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      setLoading(true)
      createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setSuccess(true)
        login(user)
        setTimeout(() => {
          navigate('/')
        }, 5000)
      })
      .catch((error) => {
        // console.log(error.code)
        setMessage(error.message)
        setLoading(false)
      })
    }
  })

  return (
    success ? <AlertRegister /> : (
      <div className="mx-7 md:mx-auto md:w-96">
        <h2 className="p-5 text-3xl font-bold text-center dark:text-white">Rejestracja</h2>
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
      </div>
    )
  )
}