import { useQuery } from "@tanstack/react-query"
import RecipeList from '../components/Recipes/RecipeList'
import LoadingIcon from "../components/UI/LoadingIcon"
import { getAllRecipes } from "../lib/api/recipes"
import useDocumentTitle from '../lib/hooks/useDocumentTitle'
import useLocalStorage from "../lib/hooks/useLocalStorage"

export default function Home() {
  useDocumentTitle('Home | Tastebite Recipes App')
  const [lastProducts, setLastProduct] = useLocalStorage('last-recipe', null)

  const { isLoading, error, data } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getAllRecipes()
  })

  const saveLastSeenRecipe = (data) => {
    setLastProduct(data)
  }
  
  const removeLastSeenRecipe = () => {
    setLastProduct(null)
  }

  if (isLoading) return <LoadingIcon />

  if (error) return 'An error has occurred: ' + error.message

  return data ? <RecipeList onOpen={saveLastSeenRecipe} products={data} header="Wszystkich przepisów" /> : <div>Nie ma żadnego przepisu</div>
}