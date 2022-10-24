import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import BestRecipe from '../../components/Products/BestRecipe/BestRecipe';
import LastViewedRecipe from '../../components/Products/LastViewedRecipe/LastViewedRecipe';
import Products from '../../components/Products/Products';
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import { db } from "../../firebase";
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Home(props) {
  useDocumentTitle('Strona główna')
  const [lastProducts, setLastProduct] = useLocalStorage('last-recipe', null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState(null)
  
  const getBestRecipe = () => {
    if(products.length < 2) {
      return null
    } else {
      return products.sort((a, b) => a.rating > b.rating ? -1 : 1)[0]
    }
  }

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
      {/* {getBestRecipe() && <BestRecipe getHotel={getBestRecipe} onOpen={openHotel} />} */}
      {products ? <Products onOpen={openHotel} products={products} header="Wszystkich przepisów" /> : <div>Nie ma żadnego przepisu</div>}
    </>
  )
}