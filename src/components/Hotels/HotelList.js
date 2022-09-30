import HotelCard from "./HotelCard/HotelCard"

function HotelList(props) {
  const count = props.hotels.length

  return (
    <div>
      <h2>Oferty ({count}):</h2>
      {props.hotels.map(hotel => <HotelCard key={hotel.id} onOpen={props.onOpen} {...hotel} />)}
    </div>
  );
}

export default HotelList;