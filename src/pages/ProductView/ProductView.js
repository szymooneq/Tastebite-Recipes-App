import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import pancakes from "../../assets/images/pancakes.jpg"
import ProductInfo from "../../components/Product/ProductInfo"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import AuthContext from "../../context/AuthContext"
import axios from "../../firebase/axios"
import { roundToTwo } from '../../helpers/roundToTwo'

export default function ProductView(props) {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const navigate = useNavigate()

  const fetchRecipe = useCallback (async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/recipes/${id}.json`)
      if (res.data.status === false) navigate('/')
      setRecipe(res.data)
      document.title = `Hotel - ${res.data.name}`
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }, [id, navigate])

  const rateHotel = async () => {
    try {
      await axios.put(`/recipes/${id}/rating.json?auth=${user.token}`, rating)
      navigate('/')
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [fetchRecipe])

  return loading ? <LoadingIcon /> : (
    <div className='mx-4 lg:w-max lg:mx-auto'>
      <div className="grid gap-4 lg:grid-cols-3 lg:w-[60rem] xl:w-[70rem]">
        <div className="flex flex-col gap-3 lg:col-span-2 h-max">
          <div className="flex flex-row items-center justify-between">
            <div className="dark:text-white">
              <h2 className='text-2xl font-semibold'>{recipe.name}</h2>
              {/* <h3 className='italic text-md dark:text-gray-400'>by Szymon Dudka</h3> */}
            </div>
            <div className="flex gap-2">
              <span className="w-max inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
                <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                {recipe.details.duration} min
              </span>
              <span className="w-max inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">
                <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                {recipe.details.level}
              </span>
              <span className="w-max inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-200 dark:text-yellow-900">
                <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span className="font-bold">{props.rating ?? "No rating"}</span>
              </span>
            </div>
          </div>
          <img className="w-full max-h-60 rounded object-cover object-center" src={pancakes} alt='' />
          <p className="text-justify dark:text-gray-400">{recipe.description}</p>
        </div>

        <div className="flex flex-row flex-wrap gap-3 sm:justify-center lg:flex-col lg:sticky lg:top-0">

          <ProductInfo theme="bg-amber-600">
            <p className="italic"><span className="font-bold">Czas całkowity:</span> {recipe.details.duration} minut</p>
            <p className="italic"><span className="font-bold">Poziom trudności:</span> {recipe.details.level}</p>
            <p className="italic"><span className="font-bold">Liczba porcji:</span> {recipe.details.portions} sztuk</p>
          </ProductInfo>

          <ProductInfo theme="bg-rose-700" title="Wartości odżywcze">
            <p className="italic"><span className="font-bold">Kalorie:</span> {roundToTwo(recipe.nutrions.calories * 4.2)} kJ / {recipe.nutrions.calories} kcal</p>
            <p className="italic"><span className="font-bold">Białko:</span> {recipe.nutrions.protein} g</p>
            <p className="italic"><span className="font-bold">Węglowodany:</span> {recipe.nutrions.carbohydrates} g</p>
            <p className="italic"><span className="font-bold">Tłuszcz:</span> {recipe.nutrions.fat} g</p>
          </ProductInfo>

          <ProductInfo theme="bg-blue-700" title="Składniki">
            <ul className="list-disc italic">
              {recipe.ingredients.map((item, id) => <li key={id} className="ml-3">{item}</li>)}
            </ul>
          </ProductInfo>

          {/* <select className="form-control form-select-lg mb-3" value={rating} onChange={e => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div>
            <input type="radio" name="rate" value="1" className="bg-orange-400" />
            <input type="radio" name="rate" value="2" className="bg-orange-400" />
            <input type="radio" name="rate" value="3" className="bg-orange-400" />
            <input type="radio" name="rate" value="4" className="bg-orange-400" />
            <input type="radio" name="rate" value="5" className="bg-orange-400" />
          </div> */}
          
        </div>
        
        <div className="my-3 dark:text-white lg:col-span-2">
          <h3 className='mb-2 text-xl'>Wykonanie</h3>
          <ol className="list-decimal dark:text-gray-400">
            {recipe.steps.map((item, id) => <li key={id} className="ml-3 mb-3">{item}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );

}

