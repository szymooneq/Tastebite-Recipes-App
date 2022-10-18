import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import HotelList from "../../components/Hotels/HotelList"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import axios from "../../firebase/axios"
import { objectToArrayWithId } from "../../helpers/objects"
import useLocalStorage from "../../hooks/useLocalStorage"

export default function Search() {
  const { term } = useParams()
  const [hotels, setHotels] = useState([])
  const [loading, setLoading] = useState(false)
  const [setLastHotel] = useLocalStorage('last-hotel', null)

  const search = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get('/hotels.json')
      const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.status === true && hotel.name.toLowerCase().includes(term.toLowerCase()))
      setHotels(newHotel)
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }, [term]) 

  useEffect(() => {
    search()
  }, [search])

  const openHotel = (hotel) => setLastHotel(hotel)

  return loading ? <LoadingIcon /> : (
    <>
      <HotelList onOpen={openHotel} hotels={hotels} header={`Results for the "${term}"`} />
    </>
  )
}