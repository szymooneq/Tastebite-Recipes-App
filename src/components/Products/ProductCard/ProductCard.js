import { Link } from 'react-router-dom'
import Badge from '../../UI/Badge/Badge'
import { levelIcon, rightArrow, starIcon, timerIcon } from '../../UI/svg'

export default function ProductCard(props) {
  
  const clickHandler = () => {
    props.onOpen(props)
  }
  
  return (
    <div className="w-100% rounded-lg shadow-md hover:shadow-2xl transition bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 xl:w-full">
      <img className="w-full h-60 object-cover object-center rounded-t-lg" src={props.img} alt="Meal preview" />
      <div className="p-4 flex flex-col gap-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        
        <div className="flex gap-2">
          <span className="px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900">
            {timerIcon}{props.details.duration} min
          </span>
          <span className="px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900">
            {levelIcon}{props.details.level}
          </span>
          <span className="px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
            {starIcon}
            <span className="font-bold">{props.rating ?? "No rating"}</span>
          </span>
        </div>
        
        <p className="text-gray-700 dark:text-gray-400">
          {props.description.slice(0, 100).concat('...')}
        </p>
      
        <Link 
          to={`/przepis/${props.id}/${props.name}`} 
          onClick={clickHandler} 
          className="py-2 px-3 inline-flex items-center w-max text-sm font-medium rounded-lg focus:ring-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Sprawdź{rightArrow}
        </Link>
      </div>
    </div>
  )
}