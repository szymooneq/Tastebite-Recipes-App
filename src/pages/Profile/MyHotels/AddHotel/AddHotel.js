import axios from '../../../../axios';
import { useNavigate } from 'react-router-dom';
import HotelForm from '../HotelForm';
import useAuth from '../../../../hooks/useAuth';

const AddHotel = props => {
  //TODO walidacja każdego pola, dodać isValidate
  const navigate = useNavigate()
  const [auth] = useAuth()

  const submit = async form => {
    await axios.post(`/hotels.json?auth=${auth.token}`, form)
    navigate('/profil/hotele')
  }

  return (
    <>
      <HotelForm
        buttonText="Dodaj!"
        onSubmit={submit} />
    </>
  );
}

export default AddHotel;