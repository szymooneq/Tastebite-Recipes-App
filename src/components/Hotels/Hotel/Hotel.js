import PropTypes from 'prop-types'
import style from './Hotel.module.css'
import hotelImg from '../../../assets/images/hotel.jpg'
import ThemeContext from '../../../context/ThemeContext'
import { useContext } from 'react'

const propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired
}

function Hotel(props) {
  const theme = useContext(ThemeContext)

  return (
    <div className={`card ${style.hotel}`}>
      <div className="card-body">

        <div className="row">
          <div className="col-4">
            {props.missing}
            <img 
              src={hotelImg}
              alt=""
              className="img-fluid img-thumbnail" />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col">
                <p className={style.title}>{props.name}</p>
                <span className="badge text-bg-light">{props.city}</span>
              </div>
              <div className="col text-end">
                <h5>Ocena: {props.rating}</h5>
                <a href="#" className={`btn btn-${theme.color} mt-2 px-5 float-end`}>Pokaż</a>  
              </div>
            </div>
          </div>
          <div className="col-12">
            <p className={style.description}>{props.description}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

Hotel.propTypes = propTypes;

export default Hotel;