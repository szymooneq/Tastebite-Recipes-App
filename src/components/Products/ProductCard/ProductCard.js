import { Link } from 'react-router-dom'
import pancakes from "../../../assets/images/pancakes.jpg"
import { rightArrow } from '../../UI/svg'

export default function ProductCard(props) {
  
  const clickHandler = () => {
    props.onOpen(props)
  }
  
  return (
    <div className="w-100% xl:w-full rounded-lg bg-white border-gray-200 shadow-md hover:shadow-2xl transition dark:bg-gray-800 dark:border-gray-700">
      <img className="w-full h-60 object-cover object-center rounded-t-lg" src={pancakes} alt="" />
      <div className="flex flex-col gap-2 p-4">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        
        <div className="flex gap-2">
          <span className="w-max inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
            <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
            {props.details.duration} min
          </span>
          <span className="w-max inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">
            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
            {props.details.level}
          </span>
          <span className="w-max inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-200 dark:text-yellow-900">
            <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span className="font-bold">{props.rating ?? "No rating"}</span>
          </span>
        </div>
        
        <p className="font-normal text-ellipsis overflow-hidden max-h-[cal] text-gray-700 dark:text-gray-400">
          {props.description.slice(0, 100).concat('...')}
        </p>
      
        <Link 
          to={`/hotele/${props.id}`} 
          onClick={clickHandler} 
          className="inline-flex w-max items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Sprawdź
          {rightArrow}
        </Link>
      </div>
    </div>
  )
}