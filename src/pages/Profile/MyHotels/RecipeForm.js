import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import DynamicInput from '../../../components/Input/DynamicInput';
import Input from '../../../components/Input/Input';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import AuthContext from '../../../context/AuthContext';
import { recipeSchema } from '../../../schemas/formSchemas';

export default function HotelForm(props) {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState([''])
  const [steps, setSteps] = useState([''])

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      description: '',
      details: {
        duration: '',
        level: '',
        portions: ''
      },
      nutrions: {
        calories: '',
        protein: '',
        carbohydrates: '',
        fat: ''
      },
      status: false
    },
    validationSchema: recipeSchema,
    onSubmit: async (values) => {
      setLoading(true);
      values.ingredients = ingredients.filter(item => item.length > 0)
      values.steps = steps.filter(item => item.length > 0)
      console.log(values)
      /* try {
        props.onSubmit({
          name: values.name,
          description: values.description,
          city: values.city,
          rooms: values.rooms,
          features: values.features,
          status: values.status,
          user_id: user.userId
        })
      } catch (ex) {
        console.log(ex.response)
      } */
      setLoading(false);
      //console.log(values)
    }
  })

  return (
    <div className="mx-7 md:mx-auto lg:w-[60rem] xl:w-[70rem]">
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-7'>
          <div>
            <div className='md:w-96'>
              <h2 className="font-bold text-2xl text-center text-black dark:text-white">Główne informacje</h2>
              <hr className="mt-2 mb-7 border-4 border-amber-600" />
              <Input
                label="Nazwa"
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touch={touched.name}
                placeholder="Podaj nazwę potrawy..." />

              <Input
                label="Opis"
                type="textarea"
                id="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors?.description}
                touch={touched?.description}
                placeholder="Opisz swoją potrawę..." />

              <div className='flex flex-nowrap justify-between gap-3'>
                <Input
                  label="Czas (min)"
                  type="number"
                  id="details.duration"
                  value={values.details.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.details?.duration}
                  touch={touched.details?.duration}
                  placeholder="Minutes..." />
                
                <Input
                  label="Porcje (sztuk)"
                  type="number"
                  id="details.portions"
                  value={values.details.portions}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.details?.portions}
                  touch={touched.details?.portions}
                  placeholder="np. 10 sztuk..." />
              </div>

              <Input
                label="Trudność"
                type="select"
                id="details.level"
                value={values.details.level}
                onChange={handleChange}
                onBlur={handleBlur}
                options={[
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" }
                ]}
                error={errors.details?.level}
                touch={touched.details?.level} />
            </div>

            <div className='md:w-96'>
              <h2 className="font-bold text-2xl text-center text-black dark:text-white">Wartości odżywcze</h2>
              <hr className="mt-2 mb-7 border-4 border-rose-700" />

              <Input
                label="Kalorie (kcal)"
                type="number"
                id="nutrions.calories"
                value={values.nutrions.calories}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.nutrions?.calories}
                touch={touched.nutrions?.calories}
                step="0.1"
                placeholder="Liczba kalorii..." />

              <div className='flex flex-col md:flex-row md:gap-3'>
                <Input
                  label="Białko (g)"
                  type="number"
                  id="nutrions.protein"
                  value={values.nutrions.protein}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  step="0.1"
                  error={errors.nutrions?.protein}
                  touch={touched.nutrions?.protein}
                  placeholder="Ilość białka w g..." />

                <Input
                  label="Węglowodany (g)"
                  type="number"
                  id="nutrions.carbohydrates"
                  value={values.nutrions.carbohydrates}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  step="0.1"
                  error={errors.nutrions?.carbohydrates}
                  touch={touched.nutrions?.carbohydrates}
                  placeholder="Ilość węglowodanów w g..." />
                  
                <Input
                  label="Tłuszcze (g)"
                  type="number"
                  id="nutrions.fat"
                  value={values.nutrions.fat}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  step="0.1"
                  error={errors.nutrions?.fat}
                  touch={touched.nutrions?.fat}
                  placeholder="Ilość tłuszczy w g..." />
              </div>
            </div>
          </div>
          
          <div>
            <div className='md:w-96'>
              <h2 className="font-bold text-2xl text-center text-black dark:text-white">Lista składników</h2>
              <hr className="mt-2 mb-7 border-4 border-blue-700" />

              <DynamicInput list={ingredients} updateList={setIngredients} type="list-disc" error={errors.ingredients} touch={touched.ingredients} />
            </div>

            <div className='md:w-96'>
              <h2 className="font-bold text-2xl text-center text-black dark:text-white">Przygotowanie</h2>
              <hr className="mt-2 mb-7 border-4 border-green-700" />

              <DynamicInput list={steps} updateList={setSteps} type="list-decimal" error={errors.steps} touch={touched.steps} />
            </div>
          </div>

          

        </div>

        <LoadingButton 
            loading={loading} 
            className="btn-success">
              {props.buttonText}
          </LoadingButton>
          
      </form>
    </div>
    
  )
}