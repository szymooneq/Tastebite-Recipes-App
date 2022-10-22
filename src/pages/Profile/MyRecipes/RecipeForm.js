import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import DynamicInput from '../../../components/Input/DynamicInput';
import Input from '../../../components/Input/Input';
import LoadingButton from '../../../components/UI/LoadingButton/LoadingButton';
import { roundToTwo } from '../../../helpers/roundToTwo';
import { recipeSchema } from '../../../schemas/formSchemas';

// TODO: string spaces validationSchema

export default function RecipeForm(props) {
  const { values, errors, touched, setFieldValue, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: props.recipe || {
      name: '',
      description: '',
      file: null,
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
      ingredients: [],
      steps: [],
      status: false
    },
    validationSchema: recipeSchema,
    onSubmit: async (values) => {
      // console.log(values)

      try {
        props.onSubmit({
          name: values.name.trim().replace( /  +/g, ' ' ),
          description: values.description.trim().replace( /  +/g, ' ' ),
          file: values.file,
          details: {
            duration: values.details.duration,
            level: values.details.level,
            portions: values.details.portions
          },
          nutrions: {
            calories: roundToTwo(values.nutrions.calories),
            protein: roundToTwo(values.nutrions.protein),
            carbohydrates: roundToTwo(values.nutrions.carbohydrates),
            fat: roundToTwo(values.nutrions.fat)
          },
          ingredients: values.ingredients.filter(item => item.length > 0).map(item => item.trim().replace( /  +/g, ' ' )),
          steps: values.steps.filter(item => item.length > 0).map(item => item.trim().replace( /  +/g, ' ' )),
          status: values.status
        })
      } catch (ex) {
        console.log(ex.response)
      }
    }
  })

  // console.log(values)

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

              <Input 
                label="Zdjęcie (podgląd)" 
                type="file"
                id="file"
                img={props.recipe?.img || null}
                file={values.file || null}
                onChange={value => {setFieldValue("file", value)}}
                error={errors.file}
                // touch={touched.file}
                />

              <Input
                label="Status"
                type="switch"
                id="status"
                value={values.status}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.status}
                touch={touched.status} />

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
                  { value: "Łatwe", label: "Łatwe" },
                  { value: "Średnie", label: "Średnie" },
                  { value: "Trudne", label: "Trudne" }
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

              <DynamicInput list={values.ingredients} updateList={value => setFieldValue("ingredients", value)} type="list-disc" error={errors.ingredients} touch={touched.ingredients} />
            </div>

            <div className='md:w-96'>
              <h2 className="font-bold text-2xl text-center text-black dark:text-white">Przygotowanie</h2>
              <hr className="mt-2 mb-7 border-4 border-green-700" />

              <DynamicInput list={values.steps} updateList={value => setFieldValue("steps", value)} type="list-decimal" error={errors.steps} touch={touched.steps} />
            </div>
          </div>
        </div>

        <div className='my-12 flex justify-center items-center gap-5'>
          <Link to={'/profil/przepisy'} className="p-2.5 text-sm font-bold rounded-lg focus:ring-4 focus:outline-none text-white bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-700 focus:ring-red-200 dark:focus:ring-red-800">Anuluj</Link>
          <LoadingButton 
            loading={props.loading} 
            loadingMessage="Dodawanie...">
              {props.buttonText}
          </LoadingButton>
        </div>
          
      </form>
    </div>
    
  )
}