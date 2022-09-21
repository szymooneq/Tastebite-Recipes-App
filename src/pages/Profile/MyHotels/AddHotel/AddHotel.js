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
    <div className="card">
      <div className="card-header">Dodaj hotel</div>
      <div className="card-body">
        <p className="text-muted">Uzupełnij dane hotelu</p>

        <HotelForm
          buttonText="Dodaj!"
          onSubmit={submit} />

      </div>
    </div>
  );
}

export default AddHotel;