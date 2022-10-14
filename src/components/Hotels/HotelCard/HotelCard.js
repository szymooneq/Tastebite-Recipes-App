import { Link } from 'react-router-dom'
import { rightArrow, star } from '../../UI/svg'

export default function HotelCard(props) {
  const description = props.description.length > 220 ? props.description.slice(0, 220).concat('...') : props.description

  const clickHandler = e => {
    props.onOpen(props)
  }
  
  return (
    <div className="mx-4 w-auto xl:w-full rounded-lg bg-white border-gray-200 shadow-md hover:shadow-2xl transition dark:bg-gray-800 dark:border-gray-700">
      <img className="w-full rounded-t-lg" src={`https://placeimg.com/600/34${Math.floor(Math.random() * 10)}/arch`} alt="" />
      <div className="p-5">
        
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        
        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
          5 min
        </span>
        
        <p className="my-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>

        {/* <div className="flex items-center mb-3">
          {star}
          <p className="ml-2 text-sm font-bold text-gray-700 dark:text-white">
            {props.rating ?? 0}
          </p>
        </div> */}
      
        <Link 
          to={`/hotele/${props.id}`} 
          onClick={clickHandler} 
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Sprawdź
          {rightArrow}
        </Link>
      </div>
    </div>
  )
}