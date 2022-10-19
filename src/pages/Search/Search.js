import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Products from "../../components/Products/Products"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import axios from "../../firebase/axios"
import { objectToArrayWithId } from "../../helpers/objectToArrayWithId"
import useLocalStorage from "../../hooks/useLocalStorage"

export default function Search() {
  const { term } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [setLastHotel] = useLocalStorage('last-hotel', null)

  const search = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axios.get('/recipes.json')
      const newData = objectToArrayWithId(res.data).filter(product => product.status === true && product.name.toLowerCase().includes(term.toLowerCase()))
      setProducts(newData)
    } catch (ex) {
      //console.log(ex.response)
    }
    setLoading(false)
  }, [term]) 

  useEffect(() => {
    search()
  }, [search])

  const openHotel = (hotel) => setLastHotel(hotel)

  return loading ? <LoadingIcon /> : (
    <>
      <Products onOpen={openHotel} products={products} header={`Results for the "${term ?? ""}"`} />
    </>
  )
}