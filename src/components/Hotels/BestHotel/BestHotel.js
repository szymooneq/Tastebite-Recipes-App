import moment from 'moment';
import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';

function BestHotel(props) {
  const [time, setTime] = useState('')
  const hotel = props.getHotel();
  const endTime = useRef(moment().add(23, 'minutes').add(34, 'seconds'))
  let interval = useRef(null)
  
  useEffect(() => {
    interval.current = setInterval(() => {
      const leftTime = -moment().diff(endTime.current) / 1000
      const minutes = Math.floor(leftTime / 60)
      const seconds = Math.floor(leftTime % 60)
      setTime(`minut: ${minutes}, sekund ${seconds}`)
    }, 1000)

    return () => {
      clearInterval(interval.current)
    } 
  }, [])

  const clickHandler = e => {
    props.onOpen(hotel)
  }
  
  return hotel && (
    <div className="container mx-auto p-4 border rounded-lg bg-green-700 border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-2 text-lg font-bold tracking-tight text-black dark:text-white">Najlepsza oferta</div>
      <p className="font-normal text-gray-300 dark:text-gray-400">{hotel.name}</p>
      <div className="flex items-center">
        <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <p className="ml-2 text-sm font-bold text-gray-300 dark:text-white">{hotel.rating}</p>
      </div>
      <p className='dark:text-white'>Do końca oferty pozostało: {time}</p>
      <Link to={`/hotele/${hotel.id}`} onClick={clickHandler} className="dark:text-white">Pokaż</Link>
    </div>
  )
}

export default BestHotel