import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../context/AuthContext';
import axios from '../../../../firebase/axios';
import RecipeForm from '../RecipeForm';

const AddHotel = (props) => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async form => {
    await axios.post(`/hotels.json?auth=${user.token}`, form)
    navigate('/profil/hotele')
  }

  return (
    <RecipeForm buttonText="Dodaj przepis" hotel={{}} onSubmit={submit} />
  );
}

export default AddHotel;