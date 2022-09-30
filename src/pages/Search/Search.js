import { useParams } from "react-router-dom"
import { objectToArrayWithId } from "../../helpers/objects"
import axios from "../../axios"
import { useCallback, useEffect, useState } from "react"
import HotelList from "../../components/Hotels/HotelList"
import useLocalStorage from "../../hooks/useLocalStorage"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"

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
      <h2>Wyniki dla frazy "{term}":</h2>
      <HotelList onOpen={openHotel} hotels={hotels} />
    </>
  )
}