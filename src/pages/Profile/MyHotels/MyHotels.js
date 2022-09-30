import { useCallback, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "../../../axios"
import Alert from "../../../components/UI/Alert"
import LoadingIcon from "../../../components/UI/LoadingIcon/LoadingIcon"
import { objectToArrayWithId } from "../../../helpers/objects"
import useAuth from "../../../hooks/useAuth"

export default function MyHotels(props) {
  const [auth] = useAuth()
  const { search } = useLocation()
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchHotels = useCallback(async () => {
    try {
      const res = await axios.get('/hotels.json')
      const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.user_id === auth.userId)
      setHotels(newHotel)
      setLoading(false)
    } catch (ex) {
      console.log(ex.response)
    }
  }, [auth.userId]) 

  const deleteHandler = async id => {
    try {
      await axios.delete(`/hotels/${id}.json`)
      setHotels(hotels.filter(x => x.id !== id))
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [fetchHotels])

  return loading ? <LoadingIcon /> : (
    <>
      {search.includes("?update") && <Alert message="Hotel został zaaktualizowany!" theme="success" />}
      
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mb-5">
          {hotels ? (
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="py-3 px-6">
                      Nazwa
                  </th>
                  <th className="py-3 px-6">
                      Status
                  </th>
                  <th className="py-3 px-6">
                      Opcje
                  </th>
                </tr>
            </thead>
            <tbody>
            {hotels.map(hotel => (
              <tr key={hotel.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="py-4 px-6 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {hotel.name}
                </td>
                <td className="py-4 px-6">
                  {hotel.status
                      ? <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">Aktywny</span>
                      : <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Ukryty</span>
                    }
                </td>
                <td className="py-4 px-6 text-right flex gap-1 justify-center">
                    <Link to={`/profil/hotele/edytuj/${hotel.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edytuj</Link>
                    <button onClick={() => deleteHandler(hotel.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Usuń</button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
          ) : (<p>Nie masz jeszcze żadnego hotelu.</p>)}
      </div>
      <Link 
        to={"dodaj"} 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 block w-max mx-auto mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Dodaj hotel</Link>
    </>
  )
}