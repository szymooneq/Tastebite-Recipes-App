import { useEffect, useState, useContext } from "react"
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton"
import { validateEmail } from "../../../helpers/validations"
import useAuth from "../../../hooks/useAuth"
import axios from "../../../axios-auth"
import InputT from "../../../components/UI/InputT"
import { useFormik } from "formik"
import { basicSchema } from "../../../schemas"
import AuthContext from "../../../context/authContext"

export default function ProfileDetails() {
  const context = useContext(AuthContext)
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: context.user.email,
      password: '',
      confirmPassword: ''
    },
    validationSchema: basicSchema,
    onSubmit: (values, actions) => {
      console.log(values, actions)
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
  })
  
  console.log(errors)

  const [auth, setAuth] = useAuth()
  const [email, setEmail] = useState(auth.email)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  /* const [errors, setErrors] = useState({
    email: '',
    password: ''
  }) */
  const [success, setSuccess] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        idToken: auth.token,
        email,
        returnSecureToken: true
      }
      if (password) data.password = password

      const res = await axios.post('accounts:update', data)

      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId
      })
      setSuccess(true)

    } catch (ex) {
      console.log(ex.response)
    }

    setLoading(false)
  }

  /* useEffect(() => {
    if (validateEmail(email)) {
      setErrors({...errors, email: ''})
    } else {
      setErrors({...errors, email: 'Niepoprawny email'})
    }
    console.log('email zaktualizowany')
  }, [email])

  useEffect(() => {
    if (password.length >= 4 || password.length === 0) {
      setErrors({...errors, password: ''})
    } else {
      setErrors({...errors, password: 'Wymagane 4 znaki'})
    }
    console.log('haslo zaktualizowane')
  }, [password]) */


  return (
    <form onSubmit={handleSubmit}>
      {success ?
        <>
          <div className="flex p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Info</span>
            <p>Dane zostały zapisane.</p>
          </div>
        </>
        : null}     

      <InputT
        id="email"
        label="Email w Props"
        touch={touched.email}
        errors={errors.email}
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Wprowadź email do edycji..." />

      {/* <InputT
        id="password"
        label="Hasło"
        error={errors.password}
        type="password"
        value={password}
        onChange={(val) => setPassword(val)}
        placeholder="Wprowadź hasło do edycji..." /> */}

    <div className="mx-auto mb-4 w-96">
      <label 
        htmlFor="email" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
      <input
        id="email"
        type="text"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        className='block w-full p-2.5 border text-sm rounded-lg outline-none bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
        {errors.email && touched.email && <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-500">{errors.email}</p>}
    </div>
    
    <div className="mx-auto mb-4 w-96">
      <label 
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
      <input
        id="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        className='block w-full p-2.5 border text-sm rounded-lg outline-none bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
        {errors.password && touched.password && <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-500">{errors.password}</p>}
    </div>

    <div className="mx-auto mb-4 w-96">
      <label 
        htmlFor="confirmPassword"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Confirm password</label>
      <input
        id="confirmPassword"
        type="password"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        className='block w-full p-2.5 border text-sm rounded-lg outline-none bg-gray-50 border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' />
        {errors.confirmPassword && touched.confirmPassword && <p className="mt-2 text-sm font-semibold text-red-600 dark:text-red-500">{errors.confirmPassword}</p>}
    </div>

      <div className="text-center">
        <LoadingButton loading={loading}>Zapisz</LoadingButton>
      </div>
    </form>
  )
}