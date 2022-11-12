import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Products from '../components/Products/Products';
import LoadingIcon from "../components/UI/LoadingIcon/LoadingIcon";
import { db } from "../firebase";
import useDocumentTitle from '../lib/hooks/useDocumentTitle';
import useLocalStorage from "../lib/hooks/useLocalStorage";

export default function Home() {
  useDocumentTitle('Strona główna')
  const [lastProducts, setLastProduct] = useLocalStorage('last-recipe', null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState(null)

  const openHotel = (recipe) => {
    setLastProduct(recipe)
  }
  const removeLastProduct = () => {
    setLastProduct(null)
  }

  const fetchData = async () => {
    let list = []
    try {
      const q = query(collection(db, "recipes"), where("status", "==", true))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() })
      })
      setProducts(list)
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])


  return loading ? <LoadingIcon /> : (
    <>
      {/* {lastProducts && <LastViewedRecipe {...lastProducts} onRemove={removeLastProduct} />} */}
      {products ? <Products onOpen={openHotel} products={products} header="Wszystkich przepisów" /> : <div>Nie ma żadnego przepisu</div>}
    </>
  )
}