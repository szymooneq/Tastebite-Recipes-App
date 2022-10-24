import { InformationCircleIcon } from '@heroicons/react/20/solid'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import Field from "../../../components/Field/Field"
import Alert from "../../../components/UI/Alert/Alert"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import AuthContext from "../../../context/AuthContext"
import { auth } from "../../../firebase"
import useDocumentTitle from "../../../hooks/useDocumentTitle"
import { registerSchema } from "../../../schemas/formSchemas"

export default function Register(props) {
  useDocumentTitle("Rejestracja | Tastebite Recipe App")
  const { user, login} = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [registered, setRegistered] = useState(false)
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
        setRegistered(true)
        login(user)
        setTimeout(() => {
          navigate('/')
        }, 5000)
      })
      .catch((error) => {
        // console.log(error.code)
        setError(error.message)
        setLoading(false)
      })
    }
  })

  return (
    !registered ? (
      <div className="mx-7 md:mx-auto md:w-96">
        <h2 className="p-5 text-3xl font-bold text-center dark:text-white">Rejestracja</h2>
        {error && <Alert message={error} theme="danger" />}

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
            label="Hasło"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
            touch={touched.password}
            placeholder="Podaj hasło..." />

          <Field
            label="Potwierdź hasło"
            type="password"
            name="confirmPassword"
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
    ) : (
      <div className="p-3 my-5 mx-auto rounded-lg">
        <div className="flex justify-center items-center">
          <InformationCircleIcon className='w-5 h-5 mr-2 text-green-700 dark:text-green-200' />
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-200">Twoje konto zostało utworzone!</h3>
        </div>
        <div className="my-3 text-center font-semibold text-md text-green-700 dark:text-green-200">
          <p>Gratulacje! Twoje konto zostało utworzone.<br />Za 5 sekund zostaniesz automatycznie zalogowany i przekierowany na stronę główną...</p>
        </div>
      </div>
    )
  )
}