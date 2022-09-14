import React, { useMemo } from "react"
import PropTypes from 'prop-types'
import Hotel from "./Hotel/Hotel"
import style from './Hotels.module.css'

const propTypes = {
  hotels: PropTypes.array.isRequired
}

const slowFunction = (count) => {
  for(let i = 0; i < 1200000000; i++) {}
  return count
}

function Hotels(props) {
  const count = useMemo(() => {
    return slowFunction(props.hotels.length)
  }, [props.hotels.length])

  return (
    <div className={style.container}>
      <h2 className={style.title}>Oferty ({count}):</h2>
      {props.hotels.map(hotel => <Hotel key={hotel.id} {...hotel} />)}
    </div>
  );
}

Hotels.propTypes = propTypes;

const areEqual = (prevProps, nextProps) => {
  return prevProps.hotels === nextProps.hotels;
}

export default React.memo(Hotels , areEqual);
/* export default Hotels; */