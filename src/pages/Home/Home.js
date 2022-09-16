import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import useWebsiteTitle from '../../hooks/useWebsiteTitle';
import Hotels from '../../components/Hotels/Hotels';
import LastHotel from '../../components/Hotels/LastHotel/LastHotel';
import BestHotel from '../../components/Hotels/BestHotel/BestHotel';
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";

const backendHotels = [
  {
    id: 0,
    name: 'Pod akacjami',
    city: 'Warszawa',
    rating: 8.3,
    description: 'Lorem officia cupidatat velit pariatur do quis eiusmod voluptate.',
    image: ''
  },
  {
    id: 1,
    name: 'Dębowy',
    city: 'Lublin',
    rating: 8.8,
    description: 'Lorem officia cupidatat velit pariatur do quis eiusmod voluptate.',
    image: ''
  }
]

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

  useEffect(() => {
    setTimeout(() => {
      setHotels(backendHotels)
      setLoading(false)
    }, 1000)
  }, [])

  return loading ? <LoadingIcon /> : (
    <>
      {lastHotel && <LastHotel {...lastHotel} onRemove={removeLastHotel} />}
      {getBestHotel() && <BestHotel getHotel={getBestHotel} />}
      <Hotels onOpen={openHotel} hotels={hotels} />
    </>
  )
}