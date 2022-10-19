import ProductCard from "./ProductCard/ProductCard";

export default function Products({ header, products, onOpen}) {
  return (
    <div className="mx-3">
      <h2 className="mb-2 text-lg font-bold dark:text-white">{header} ({products.length}):</h2>
      <div className='grid md:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7'>
        {products.map(recipe => (
          <ProductCard key={recipe.id} onOpen={onOpen} {...recipe} />
        ))}
      </div>
    </div>
  )
}
