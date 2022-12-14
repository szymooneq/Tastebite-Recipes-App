import RecipeCard from "./RecipeCard";

export default function RecipeList({ header, products, onOpen }) {
  return (
    <div className="mx-3">
      <h2 className="mb-2 text-lg font-bold dark:text-white">{header} ({products?.length || 0}):</h2>
      <div className='grid md:mx-0 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7'>
        {products && products.map(recipe => <RecipeCard key={recipe.id} onOpen={onOpen} {...recipe} />)}
      </div>
    </div>
  )
}
