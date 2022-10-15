import HotelCard from "./HotelCard/HotelCard";

export default function HotelList(props) {
  return (
    <>
      <h2 className="text-lg font-bold mb-2 dark:text-white">All recipes ({props.hotels.length}):</h2>
      <div className='mx-3 grid md:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7'>
        {props.hotels.map(hotel => (
          <HotelCard key={hotel.id} onOpen={props.onOpen} {...hotel} />
        ))}
      </div>
    </>
  );
}
