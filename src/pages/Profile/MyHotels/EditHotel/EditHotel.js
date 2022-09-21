import axios from '../../../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import HotelForm from '../HotelForm';
import { useEffect, useState } from 'react';

const EditHotel = props => {
  //TODO walidacja każdego pola, dodać isValidate
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const navigate = useNavigate()

  const submit = async form => {
    await axios.put(`/hotels/${id}.json`, form)
    navigate('/profil/hotele')
  }

  const fetchHotel = async () => {
    const res = await axios.get(`/hotels/${id}.json`)
    setHotel(res.data)
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