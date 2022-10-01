import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../../context/AuthContext';
import axios from '../../../../firebase/axios';
import HotelForm from '../HotelForm';

const AddHotel = (props) => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async form => {
    await axios.post(`/hotels.json?auth=${user.token}`, form)
    navigate('/profil/hotele')
  }

  return (
    <HotelForm buttonText="Dodaj!" hotel={{}} onSubmit={submit} />
  );
}

export default AddHotel;