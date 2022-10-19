import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../context/AuthContext';
import axios from '../../../../firebase/axios';
import RecipeForm from '../RecipeForm';

export default function AddRecipe(props) {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async form => {
    await axios.post(`/recipes.json?auth=${user.token}`, form)
    navigate('/profil/hotele')
  }

  return (
    <RecipeForm buttonText="Dodaj przepis" recipe={{}} onSubmit={submit} />
  );
}
