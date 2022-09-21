import axios from '../../../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import HotelForm from '../HotelForm';
import { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';

const EditHotel = props => {
  //TODO walidacja każdego pola, dodać isValidate
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [auth] = useAuth()
  const navigate = useNavigate()

  const submit = async form => {
    await axios.patch(`/hotels/${id}.json?auth=${auth.token}`, form)
    navigate('/profil/hotele')
  }

  const fetchHotel = async () => {
    const res = await axios.get(`/hotels/${id}.json`)
    const hotelData = res.data

    delete(hotelData.user_id)
    delete(hotelData.rating)

    setHotel(hotelData)
  }

  useEffect(() => {
    fetchHotel()
  }, [])

  return (
    <div className="card">
      <div className="card-header">Edytuj hotel</div>
      <div className="card-body">
        <p className="text-muted">Uzupełnij dane hotelu</p>

        <HotelForm
          hotel={hotel}
          buttonText="Zapisz!"
          onSubmit={submit} />

      </div>
    </div>
  );
}

export default EditHotel;