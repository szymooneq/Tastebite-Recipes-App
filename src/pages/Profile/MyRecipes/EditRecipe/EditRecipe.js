import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingIcon from '../../../../components/UI/LoadingIcon/LoadingIcon';
import AuthContext from '../../../../context/AuthContext';
import axios from '../../../../firebase/axios';
import RecipeForm from '../RecipeForm';

export default function EditRecipe(props) {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const submit = async form => {
    await axios.patch(`/recipes/${id}.json?auth=${user.token}`, form)
    navigate('/profil/hotele?update')
  }

  const fetchHotel = useCallback(async () => {
    const res = await axios.get(`/recipes/${id}.json`)
    const recipeData = res.data

    delete(recipeData.user_id)
    delete(recipeData.rating)

    setRecipe(recipeData)
    setLoading(false)
  }, [id]) 

  useEffect(() => {
    fetchHotel()
  }, [fetchHotel])

  return loading ? <LoadingIcon /> : (
    <>
      {recipe && <RecipeForm recipe={recipe} buttonText="Zaaktualizuj przepis" onSubmit={submit} />}
    </>
  )
}
