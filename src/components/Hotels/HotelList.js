import HotelCard from "./HotelCard/HotelCard";

export default function HotelList(props) {
  return (
    <section className="mb-20">
      <div className="container mx-auto">
        <h2 className="dark:text-white">Oferty {props.hotels.length}:</h2>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-14'>
          {props.hotels.map(hotel => (
            <HotelCard key={hotel.id} onOpen={props.onOpen} {...hotel} />
          ))}
        </div>
      </div>
    </section>
  );
}
