import React from "react";
import style from './Hotel.module.css';
import hotelImg from '../../../assets/images/hotel.jpg';

function Hotel() {
  return (
    <div className={`card ${style.hotel}`}>
      <div className="card-body">

        <div className="row">
          <div className="col-4">
            <img 
              src={hotelImg}
              alt=""
              className="img-fluid img-thumbnail" />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col">
                <p className={style.title}>Pensjonat</p>
                <span className="badge text-bg-light">Warszawa</span>
              </div>
              <div className="col text-end">
                <h5>Ocena: 8.3</h5>
                <a href="#" className="btn btn-primary mt-2 px-5 float-end">Pokaż</a>
              </div>
            </div>
          </div>
          <div className="col-12">
            <p className={style.description}>Dolore cillum consequat consequat elit proident dolore est sit. Reprehenderit incididunt sunt ipsum veniam. Commodo Lorem officia cupidatat velit pariatur do quis eiusmod voluptate.</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Hotel;