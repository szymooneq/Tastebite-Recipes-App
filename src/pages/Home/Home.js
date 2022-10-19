import { useEffect, useState } from "react";
import BestProduct from '../../components/Products/BestProduct/BestProduct';
import LastProduct from '../../components/Products/LastProduct/LastProduct';
import Products from '../../components/Products/Products';
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import axios from "../../firebase/axios";
import { objectToArrayWithId } from "../../helpers/objectToArrayWithId";
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useLocalStorage from "../../hooks/useLocalStorage";

export default function Home(props) {
  useDocumentTitle('Strona główna')
  const [lastProducts, setLastProduct] = useLocalStorage('last-recipe', null)
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState(true)
  
  const getBestRecipe = () => {
    if(products.length < 2) {
      return null
    } else {
      return products.sort((a, b) => a.rating > b.rating ? -1 : 1)[0]
    }
  }

  const openHotel = (recipe) => setLastProduct(recipe)
  const removeLastProduct = () => setLastProduct(null)

  const fetchHotels = async () => {
    try {
      const res = await axios.get('/recipes.json')
      const newRecipe = objectToArrayWithId(res.data).filter(recipe => recipe.status === true)
      setProducts(newRecipe)
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
      {/* {lastProducts && <LastProduct {...lastProducts} onRemove={removeLastProduct} />} */}
      {/* {getBestRecipe() && <BestProduct getHotel={getBestRecipe} onOpen={openHotel} />} */}
      <Products onOpen={openHotel} products={products} header="All recipes" />
    </>
  )
}