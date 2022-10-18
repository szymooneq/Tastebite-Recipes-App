import HotelCard from "./HotelCard/HotelCard";

export default function HotelList(props) {
  return (
    <div className="mx-3">
      <h2 className="mb-2 text-lg font-bold dark:text-white">{props.header} ({props.hotels.length}):</h2>
      <div className='grid md:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7'>
        {props.hotels.map(hotel => (
          <HotelCard key={hotel.id} onOpen={props.onOpen} {...hotel} />
        ))}
      </div>
    </div>
  );
}
