import axios from "../../axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import useWebsiteTitle from "../../hooks/useWebsiteTitle"
import { objectToArrayWithId } from "../../helpers/objects"

function Hotel(props) {
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)

  const setTitle = useWebsiteTitle()

  const fetchHotel = async () => {
    try {
      setLoading(true)
      const res = await axios.get(`/hotels/${id}.json`)
      setHotel(res.data)
      setTitle(`Hotel - ${res.data.name}`)
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    //pobieranie danych
    fetchHotel()
  }, [])

  return loading ? <LoadingIcon /> : (
    <h1>Hotel: {hotel.name}</h1>
  )
}

export default Hotel