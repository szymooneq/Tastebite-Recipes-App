import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import RecipeList from "../components/Recipes/RecipeList"
import LoadingIcon from "../components/UI/LoadingIcon/LoadingIcon"
import { getRecipesByTerm } from "../lib/api/recipes"
import useLocalStorage from "../lib/hooks/useLocalStorage"

// TODO: better searchbar

export default function Search() {
  const { term } = useParams()
  const [setLastProduct] = useLocalStorage('last-hotel', null)

  const { isLoading, error, data } = useQuery({
    queryKey: ['recipes', term],
    queryFn: () => getRecipesByTerm(term)
  })

  const saveLastSeenRecipe = (data) => {
    setLastProduct(data)
  }

  if (isLoading) return <LoadingIcon />

  if (error) return 'An error has occurred: ' + error.message

  return <RecipeList onOpen={saveLastSeenRecipe} products={data} header={`Rezultat wyszukiwania dla "${term ?? ""}"`} />
}