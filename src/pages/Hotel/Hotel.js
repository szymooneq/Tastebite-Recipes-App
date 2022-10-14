import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import pancakes from "../../assets/images/pancakes.jpg"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import AuthContext from "../../context/AuthContext"
import axios from "../../firebase/axios"

export default function Hotel(props) {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const navigate = useNavigate()

  const fetchHotel = useCallback (async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/hotels/${id}.json`)
      if (res.data.status === false) navigate('/')
      setHotel(res.data)
      document.title = `Hotel - ${res.data.name}`
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }, [id, navigate])

  const rateHotel = async () => {
    try {
      await axios.put(`/hotels/${id}/rating.json?auth=${user.token}`, rating)
      navigate('/')
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    fetchHotel()
  }, [fetchHotel])

  /* return loading ? <LoadingIcon /> : (
    <div className="container mb-14 mx-auto">
      
      <div className='flex flex-col lg:flex-row'>
        <div>
          <h2 className="text-2xl font-semibold">Hotel: {hotel.name}</h2>
          <div className='mb-4 lg:mb-0 flex text-sm'>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
              {hotel.city}
            </span>
          </div>
          <div className=''>
            <img className="p-20 w-full" src={`https://placeimg.com/420/180/arch`} alt="" />
            <p className="lead">{hotel.description}</p>
          </div>
        </div>
        <div className='mb-8 px-6 py-8 w-full'>
          <p>Wyposażenie:</p>
          <ul>
            {hotel.features.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    
      <h4>Ocena: {hotel.rating ?? 'brak ocen'}</h4>
        {user ? (
          <div className="input-group row mt-4">
            <div className="col">
              <select className="form-control form-select-lg mb-3" value={rating} onChange={e => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col">
              <button className="btn btn-info" onClick={rateHotel}>Oceń</button>
            </div>
          </div>
        ): null}
    </div>
  ) */
  return loading ? <LoadingIcon /> : (
    <div className='container'>
      <div className="mx-4 flex flex-col gap-4 md:mx-0 lg:flex-row lg:justify-center">
        <div className="lg:w-[40rem]">
          <div className="flex flex-row items-center justify-between">
            <div className="dark:text-white">
              <h2 className='text-2xl font-semibold'>Pancakes</h2>
              <h3 className='italic text-md mb-4 dark:text-gray-400'>by Szymon Dudka</h3>
            </div>
            <div className="flex gap-2">
              <span className="w-max bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
                5 min
              </span>
              <span className="w-max bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
                Easy
              </span>
            </div>
          </div>
          <img className="w-full h-40 object-cover" src={pancakes} alt='' />
          <p className="text-justify dark:text-gray-400">{hotel.description}</p>
        </div>
        <div>
          <div className="px-4 py-2 h-max rounded text-white bg-amber-500">
            <p>Czas przygotowania: 25 minut</p>
            <p>Czas smażenia: 25 minut</p>
            <p>Liczba porcji: 8 sztuk o średnicy 15 cm</p>
          </div>
          <div className="px-4 py-2 h-max rounded text-white bg-blue-700">
            <p className="font-bold">Składniki:</p>
            <ul className="list-disc">
              {hotel.features.map(item => <li key={item} className="ml-3">{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

   
    </div>
  );

}

