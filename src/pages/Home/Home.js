import { useEffect, useState } from "react";
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import HotelList from '../../components/Hotels/HotelList';
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "../../firebase/axios";
import { objectToArrayWithId } from "../../helpers/objects";
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useLocalStorage from "../../hooks/useLocalStorage";


export default function Home(props) {
  useDocumentTitle('Strona główna')
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
    setLoading(false)
  }

  useEffect(() => {
    fetchHotels()
  }, [])

  return loading ? <LoadingIcon /> : (
    <>
      {lastHotel && <LastHotel {...lastHotel} onRemove={removeLastHotel} />}
      {getBestHotel() && <BestHotel getHotel={getBestHotel} onOpen={openHotel} />}
      <HotelList onOpen={openHotel} hotels={hotels} />
    </>
  )
}