import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import pancakes from "../../assets/images/pancakes.jpg"
import Information from "../../components/ProductView/Information"
import InformationItem from "../../components/ProductView/InformationItem"
import Badge from "../../components/UI/Badge/Badge"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import { levelIcon, starIcon, timerIcon } from "../../components/UI/svg"
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
      document.title = `${res.data.name}`
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
    <div className='mx-4 lg:mx-auto lg:w-max'>
      <div className="grid gap-4 lg:grid-cols-3 lg:w-[60rem] xl:w-[70rem]">
        <div className="flex flex-col gap-3 h-max lg:col-span-2">
          <div className="flex flex-row items-center justify-between">
            <h2 className='text-2xl font-semibold dark:text-white'>{recipe.name}</h2>
            <div className="flex gap-2">
              <Badge color="indigo">
                {timerIcon}{recipe.details.duration} min
              </Badge>
              <Badge color="green">
                {levelIcon}{recipe.details.level}
              </Badge>
              <Badge color="yellow">
                {starIcon}
                <span className="font-bold">{props.rating ?? "No rating"}</span>
              </Badge>
            </div>
          </div>
          <img className="w-full max-h-60 rounded object-cover object-center" src={pancakes} alt='' />
          <p className="text-justify dark:text-gray-400">{recipe.description}</p>
        </div>

        <div className="flex flex-row flex-wrap gap-3 sm:justify-center lg:flex-col lg:sticky lg:top-0">
          <Information theme="bg-amber-600">
            <InformationItem title="Czas całkowity" content={`${recipe.details.duration} minut`} />
            <InformationItem title="Poziom trudności" content={recipe.details.level} />
            <InformationItem title="Liczba porcji" content={recipe.details.portions} />
          </Information>

          <Information theme="bg-rose-700" title="Wartości odżywcze">
            <InformationItem title="Kalorie" content={`${roundToTwo(recipe.nutrions.calories * 4.2)} kJ / ${recipe.nutrions.calories} kcal`} />
            <InformationItem title="Białko" content={`${recipe.nutrions.protein} g`} />
            <InformationItem title="Węglowodany" content={`${recipe.nutrions.carbohydrates} g`} />
            <InformationItem title="Tłuszcz" content={`${recipe.nutrions.fat} g`} />
          </Information>

          <Information theme="bg-blue-700" title="Składniki">
            <ul className="list-disc list-inside italic">
              {recipe.ingredients.map((item, id) => <li key={id}>{item}</li>)}
            </ul>
          </Information>

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
        
        <div className="my-3 lg:col-span-2 dark:text-white">
          <h3 className='mb-2 text-xl font-semibold'>Wykonanie</h3>
          <ol className="list-decimal list-inside dark:text-gray-400">
            {recipe.steps.map((item, id) => <li key={id} className="mb-3">{item}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );

}

