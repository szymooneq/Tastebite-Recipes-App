import { useNavigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../axios';
import HotelForm from '../HotelForm';

const AddHotel = (props) => {
  const [auth] = useAuth()
  const navigate = useNavigate()

  const submit = async form => {
    await axios.post(`/hotels.json?auth=${auth.token}`, form)
    navigate('/profil/hotele')
  }

  return (
    <>
      <HotelForm buttonText="Dodaj!" hotel={{}} onSubmit={submit} />
    </>
  );
}

export default AddHotel;