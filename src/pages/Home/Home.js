import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import Hotels from '../../components/Hotels/Hotels';
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "../../axios";
import { objectToArrayWithId } from "../../helpers/objects"


export default function Home(props) {
  useWebsiteTitle('Strona główna')
  const [lastHotel, setLastHotel] = useLocalStorage('last-hotel', null)
  const [loading, setLoading] = useState(true)
  const [hotels, setHotels] = useState(true)
  
  const getBestHotel = () => {
    if(hotels.length < 2) {
      return null
    } else {
      return hotels.sort((a, b) => a.rating > b.rating ? -1 : 1)[0]
    }
  }

  const openHotel = (hotel) => setLastHotel(hotel)
  const removeLastHotel = () => setLastHotel(null)

  const fetchHotels = async () => {
    try {
      const res = await axios.get('/hotels.json')
      const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.status === true)
      setHotels(newHotel)
    } catch (ex) {
      console.log(ex.response)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return loading ? <LoadingIcon /> : (
    <>
      {lastHotel && <LastHotel {...lastHotel} onRemove={removeLastHotel} />}
      {getBestHotel() && <BestHotel getHotel={getBestHotel} />}
      <Hotels onOpen={openHotel} hotels={hotels} />
    </>
  )
}