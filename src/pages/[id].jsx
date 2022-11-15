import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from "react-router-dom"
import Details from "../components/Recipes/[id]/Details"
import Ingredients from '../components/Recipes/[id]/Ingredients'
import Nutrions from '../components/Recipes/[id]/Nutrions'
import Badges from '../components/UI/Badges/Badges'
import LoadingIcon from "../components/UI/LoadingIcon/LoadingIcon"
import Image from '../components/UI/Skeleton/Image'
import { getRecipeByID } from '../lib/api/recipes'

export default function ProductView() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { isLoading, error, data } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeByID(id).then(res => {
      if(res) {
        return res
      } else {
        navigate('/')
      }
    })
  })

  // TODO: rating system

  if (isLoading) return <LoadingIcon />

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='mx-4 lg:mx-auto lg:w-max'>
      <div className="grid gap-4 lg:grid-cols-3 lg:w-[60rem] xl:w-[70rem]">

        <div className="flex flex-col gap-3 h-max lg:col-span-2">
          <h2 className='text-3xl font-bold dark:text-white'>{data.name}</h2>
          <Badges {...data.details} />
          <Image className="w-full h-60 md:h-80 lg:h-96 rounded object-cover object-center" src={data.img} alt="Meal preview" />
          <p className="text-justify dark:text-gray-400">{data.description}</p>
        </div>

        <div className="flex flex-row flex-wrap gap-3 sm:justify-center lg:flex-col lg:sticky lg:top-0">
          <Details {...data.details} />
          <Nutrions {...data.nutrions} />
          <Ingredients arr={data.ingredients} />
        </div>
        
        <div className="my-3 lg:col-span-2 dark:text-white">
          <h3 className='mb-2 text-2xl font-bold'>Wykonanie</h3>
          <ol className="list-decimal list-inside dark:text-gray-400">
            {data.steps.map((item, id) => <li key={id} className="mb-3">{item}</li>)}
          </ol>
        </div>
        
      </div>
    </div>
  )
}
