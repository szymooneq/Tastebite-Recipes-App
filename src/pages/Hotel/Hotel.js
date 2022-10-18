import { useCallback, useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import pancakes from "../../assets/images/pancakes.jpg"
import ProductInfo from "../../components/Product/ProductInfo"
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon"
import AuthContext from "../../context/AuthContext"
import axios from "../../firebase/axios"

export default function Hotel(props) {
  const { user } = useContext(AuthContext)
  const { id } = useParams()
  const [hotel, setHotel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const navigate = useNavigate()

  const fetchHotel = useCallback (async () => {
    setLoading(true)
    try {
      const res = await axios.get(`/hotels/${id}.json`)
      if (res.data.status === false) navigate('/')
      setHotel(res.data)
      document.title = `Hotel - ${res.data.name}`
    } catch (ex) {
      console.log(ex.response)
    }
    setLoading(false)
  }, [id, navigate])

  const rateHotel = async () => {
    try {
      await axios.put(`/hotels/${id}/rating.json?auth=${user.token}`, rating)
      navigate('/')
    } catch (ex) {
      console.log(ex.response)
    }
  }

  useEffect(() => {
    fetchHotel()
  }, [fetchHotel])

  /* return loading ? <LoadingIcon /> : (
    <div className="container mb-14 mx-auto">
      
      <div className='flex flex-col lg:flex-row'>
        <div>
          <h2 className="text-2xl font-semibold">Hotel: {hotel.name}</h2>
          <div className='mb-4 lg:mb-0 flex text-sm'>
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
              {hotel.city}
            </span>
          </div>
          <div className=''>
            <img className="p-20 w-full" src={`https://placeimg.com/420/180/arch`} alt="" />
            <p className="lead">{hotel.description}</p>
          </div>
        </div>
        <div className='mb-8 px-6 py-8 w-full'>
          <p>Wyposażenie:</p>
          <ul>
            {hotel.features.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
    
      <h4>Ocena: {hotel.rating ?? 'brak ocen'}</h4>
        {user ? (
          <div className="input-group row mt-4">
            <div className="col">
              <select className="form-control form-select-lg mb-3" value={rating} onChange={e => setRating(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="col">
              <button className="btn btn-info" onClick={rateHotel}>Oceń</button>
            </div>
          </div>
        ): null}
    </div>
  ) */
  return loading ? <LoadingIcon /> : (
    <div className='mx-4 lg:w-max lg:mx-auto'>
      <div className="grid gap-4 lg:grid-cols-3 lg:w-[60rem] xl:w-[70rem]">
        <div className="flex flex-col gap-3 lg:col-span-2 h-max">
          <div className="flex flex-row items-center justify-between">
            <div className="dark:text-white">
              <h2 className='text-2xl font-semibold'>Pancakes</h2>
              {/* <h3 className='italic text-md dark:text-gray-400'>by Szymon Dudka</h3> */}
            </div>
            <div className="flex gap-2">
              <span className="w-max inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-indigo-200 dark:text-indigo-900">
                <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
                25 min
              </span>
              <span className="w-max inline-flex items-center bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-200 dark:text-green-900">
                <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                Easy
              </span>
              <span className="w-max inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-yellow-200 dark:text-yellow-900">
                <svg aria-hidden="true" className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <span className="font-bold">4.95</span>
              </span>
            </div>
          </div>
          <img className="w-full max-h-60 rounded object-cover object-center" src={pancakes} alt='' />
          <p className="text-justify dark:text-gray-400">{hotel.description}</p>
        </div>

        <div className="flex flex-row flex-wrap gap-3 sm:justify-center lg:flex-col lg:sticky lg:top-0">

          <ProductInfo theme="bg-amber-600">
            <p className="italic"><span className="font-bold">Czas całkowity:</span> 25 minut</p>
            <p className="italic"><span className="font-bold">Poziom trudności:</span> łatwy</p>
            <p className="italic"><span className="font-bold">Liczba porcji:</span> 10 sztuk</p>
          </ProductInfo>

          <ProductInfo theme="bg-rose-700" title="Wartości odżywcze">
            <p className="italic"><span className="font-bold">Kalorie:</span> 903.8 kJ / 216 kcal</p>
            <p className="italic"><span className="font-bold">Białko:</span> 5.9 g</p>
            <p className="italic"><span className="font-bold">Węglowodany:</span> 30.5 g</p>
            <p className="italic"><span className="font-bold">Tłuszcz:</span> 7.8 g</p>
          </ProductInfo>

          <ProductInfo theme="bg-blue-700" title="Składniki">
            <ul className="list-disc italic">
              {hotel.features.map(item => <li key={item} className="ml-3">{item}</li>)}
            </ul>
          </ProductInfo>
          
          {/* <div>
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
            <li className="ml-3 mb-3">Heat a griddle or large skillet over medium-low heat. In a bowl, mix together dry ingredients. Beat eggs into 1½ cups milk, then stir in 2 tablespoons melted cooled butter, if using it. Gently stir this mixture into dry ingredients, mixing only enough to moisten flour; don't worry about a few lumps. If batter seems thick, add a little more milk.</li>
            <li className="ml-3 mb-3">Place a teaspoon or 2 of butter or oil on griddle or skillet. When butter foam subsides or oil shimmers, ladle batter onto griddle or skillet, making pancakes of any size you like. Adjust heat as necessary; usually, first batch will require higher heat than subsequent batches. Flip pancakes after bubbles rise to surface and bottoms brown, after 2 to 4 minutes.</li>
            <li className="ml-3 mb-3">Cook until second side is lightly browned. Serve, or hold on an ovenproof plate in a 200-degree oven for up to 15 minutes.</li>
          </ol>
        </div>
      </div>
    </div>
  );

}

