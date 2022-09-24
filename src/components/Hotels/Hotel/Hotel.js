import ThemeContext from '../../../context/themeContext'
import { useContext } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Link } from 'react-router-dom'


function Hotel(props) {
  const theme = useContext(ThemeContext)
  const [auth] = useAuth()

  const clickHandler = e => {
    props.onOpen(props)
  }

  return (
    <div className="m-3 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img className="w-full rounded-t-lg" src={`https://placeimg.com/600/34${Math.floor(Math.random() * 10)}/arch`} alt="" />
      <div className="p-5">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.name}</h5>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900">{props.city}</span>
        <p className="my-3 font-normal text-gray-700 dark:text-gray-400">{props.description}</p>
        <div className="flex items-center mb-3">
          <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          <p className="ml-2 text-sm font-bold text-gray-300 dark:text-white">{props.rating ?? 0}</p>
        </div>
        <Link to={`/hotele/${props.id}`} onClick={clickHandler} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Pokaż
            <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </Link>
      </div>
    </div>
  )
}

export default Hotel;