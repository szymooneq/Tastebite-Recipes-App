import React, { useMemo } from "react"
import Hotel from "./Hotel/Hotel"
import style from './Hotels.module.css'

function Hotels(props) {
  const count = props.hotels.length

  return (
    <div className={style.container}>
      <h2 className={style.title}>Oferty ({count}):</h2>
      {props.hotels.map(hotel => <Hotel key={hotel.id} onOpen={props.onOpen} {...hotel} />)}
    </div>
  );
}

export default Hotels;