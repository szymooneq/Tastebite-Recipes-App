import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../../../axios"
import { objectToArrayWithId } from "../../../helpers/objects"
import useAuth from "../../../hooks/useAuth"

export default function MyHotels(props) {
  const [auth] = useAuth()
  const [hotels, setHotels] = useState([])

  const fetchHotels = useCallback(async () => {
    try {
      const res = await axios.get('/hotels.json')
      const newHotel = objectToArrayWithId(res.data).filter(hotel => hotel.user_id === auth.userId)
      setHotels(newHotel)
    } catch (ex) {
      console.log(ex.response)
    }
  }, [auth.userId]) 

  const deleteHandler = async id => {
    try {
      await axios.delete(`/hotels/${id}.json`)
      setHotels(hotels.filter(x => x.id !== id))
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    fetchHotels()
  }, [fetchHotels])

  return (
    <div>
      {hotels ? (
        <table className="table">
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Status</th>
              <th>Opcje</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <tr key={hotel.id}>
                <td>{hotel.name}</td>
                <td>
                  {parseInt(hotel.status) === 1
                    ? <span className="badge text-bg-success">Aktywyny</span>
                    : <span className="badge text-bg-secondary">Ukryty</span>
                  }
                </td>
                <td>
                  <Link to={`/profil/hotele/edytuj/${hotel.id}`} className="btn btn-warning">Edytuj</Link>
                  <button onClick={() => deleteHandler(hotel.id)} className="ms-2 btn btn-danger">Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<p>Nie masz jeszcze żadnego hotelu.</p>)}
      <Link to={"dodaj"} className="btn btn-primary">Dodaj hotel</Link>
    </div>
  )
}