import { ArrowRightIcon, ChartBarIcon, ClockIcon, StarIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../../UI/Badge/Badge'
import Skeleton from '../../UI/Skeleton/Skeleton'

export default function ProductCard(props) {
  const [loadingImg, setLoadingImg] = useState(true)
  
  const clickHandler = () => {
    props.onOpen(props)
  }
  
  return (
    <div className="w-100% rounded-lg shadow-md hover:shadow-2xl transition bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 xl:w-full">
      
      {loadingImg && (
        <div className="w-full h-60 flex justify-center items-center rounded animate-pulse bg-gray-300 dark:bg-gray-700">
          <Skeleton />
        </div>
      )}
      <img style={{display: loadingImg ? "none" : "block"}} className="w-full h-60 object-cover object-center rounded-t-lg" src={props.img} onLoad={() => setLoadingImg(false)} alt={props.name} />
      
      <div className="p-4 flex flex-col gap-2">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.name}
        </h5>
        
        <div className="flex gap-2">
          <span className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900`}>
              <ClockIcon className="mr-1 w-3 h-3" />{props.details.duration} min
          </span>
          <span className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900`}>
              <ChartBarIcon className="mr-1 w-3 h-3" />{props.details.level}
          </span>
          <span className={`px-2.5 py-0.5 w-max inline-flex items-center text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900`}>
              <StarIcon className="mr-1 w-3 h-3" />{props.rating ?? "Brak ocen"}
          </span>
        </div>
        
        <p className="min-h-[4.5rem] text-gray-700 dark:text-gray-400">
          {props.description.slice(0, 100).concat('...')}
        </p>
      
        <Link 
          to={`/przepis/${props.id}/${props.name}`} 
          onClick={clickHandler} 
          className="py-2 px-3 w-max inline-flex justify-center items-center text-sm font-medium rounded-lg focus:ring-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Sprawdź<ArrowRightIcon className="ml-2 -mr-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}