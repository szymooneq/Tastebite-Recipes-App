import { collection, getDocs, query, where } from "firebase/firestore"
import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Products from "../../components/Products/Products"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import { db } from "../../firebase"
import useLocalStorage from "../../hooks/useLocalStorage"

// TODO: better searchbar

export default function Search() {
  const { term } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [setLastProduct] = useLocalStorage('last-hotel', null)

  const search = useCallback(async () => {
    let list = []
    try {
      const q = query(collection(db, "recipes"), where("status", "==", true))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      list = list.filter(item => item.name.toLowerCase().includes(term.toLowerCase()))
      setProducts(list)
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }, [term])

  const openRecipe = (product) => {
    setLastProduct(product)
  }

  useEffect(() => {
    search()
  }, [search])

  return loading ? <LoadingIcon /> : <Products onOpen={openRecipe} products={products} header={`Rezultat wyszukiwania dla "${term ?? ""}"`} />
}