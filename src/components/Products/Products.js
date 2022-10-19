import ProductCard from "./ProductCard/ProductCard";

export default function Products(props) {
  return (
    <div className="mx-3">
      <h2 className="mb-2 text-lg font-bold dark:text-white">{props.header} ({props.products.length}):</h2>
      <div className='grid md:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7'>
        {props.products.map(recipe => (
          <ProductCard key={recipe.id} onOpen={props.onOpen} {...recipe} />
        ))}
      </div>
    </div>
  );
}
