import Button from '../../UI/Button/Button'
import CustomLink from '../../UI/CustomLink/CustomLink'
import * as Field from '../../Fields'
import Header from '../Header/Header'
import { RecipeFormProps } from './RecipeForm.types'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { recipeSchema } from '../../../lib/schemas'
import { useFormik } from 'formik'

// TODO: add fieldsets
const RecipeForm = ({ initialValues, onSubmit }: RecipeFormProps): JSX.Element => {
	const formik = useFormik({
		initialValues,
		validationSchema: toFormikValidationSchema(recipeSchema),
		onSubmit
	})

	const {
		values,
		errors,
		touched,
		dirty,
		isValid,
		isSubmitting,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit
	} = formik

	return (
		<div className="mx-7 md:mx-auto lg:w-[60rem] xl:w-[70rem]">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-7">
					<div>
						<div className="md:w-96">
							<Header title="Główne informacje" hrColor="amber" />

							<Field.Text
								name="name"
								label="Nazwa"
								placeholder="Podaj nazwę potrawy..."
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
								errorMsg={errors.name}
								isTouched={touched.name}
							/>

							<Field.Textarea
								name="description"
								label="Opis"
								placeholder="Opisz swoją potrawę..."
								value={values.description}
								errorMsg={errors.description}
								isTouched={touched.description}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							<Field.File
								name="file"
								label="Zdjęcie (podgląd)"
								errorMsg={errors.file}
								currentImg={values.img}
								value={values.file}
								setValue={setFieldValue}
							/>

							<Field.Checkbox
								name="status"
								label="Status"
								checked={values.status}
								onChange={handleChange}
							/>

							<div className="flex flex-nowrap justify-between gap-3">
								<Field.Text
									type="number"
									name="details.duration"
									label="Czas (min)"
									placeholder="Minut..."
									step={1}
									value={values.details.duration}
									errorMsg={errors.details?.duration}
									isTouched={touched.details?.duration}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								<Field.Text
									type="number"
									name="details.portions"
									label="Porcje (sztuk)"
									placeholder="np. 10 sztuk..."
									step={0.1}
									value={values.details.portions}
									errorMsg={errors.details?.portions}
									isTouched={touched.details?.portions}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>

							<Field.Select
								name="details.level"
								label="Trudność"
								value={values.details.level}
								errorMsg={errors.details?.level}
								isTouched={touched.details?.level}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>

						<div className="md:w-96">
							<Header title="Wartości odżywcze" hrColor="rose" />

							<Field.Text
								type="number"
								name="nutrions.calories"
								label="Kalorie (kcal)"
								placeholder="Liczba kalorii..."
								step={0.1}
								value={values.nutrions.calories}
								errorMsg={errors.nutrions?.calories}
								isTouched={touched.nutrions?.calories}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							<div className="flex flex-col md:flex-row md:gap-3">
								<Field.Text
									type="number"
									name="nutrions.protein"
									label="Białko (g)"
									placeholder="Ilość białka w g..."
									step={0.1}
									value={values.nutrions.protein}
									errorMsg={errors.nutrions?.protein}
									isTouched={touched.nutrions?.protein}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								<Field.Text
									type="number"
									name="nutrions.carbohydrates"
									label="Węglowodany (g)"
									placeholder="Ilość węglowodanów w g..."
									step={0.1}
									value={values.nutrions.carbohydrates}
									errorMsg={errors.nutrions?.carbohydrates}
									isTouched={touched.nutrions?.carbohydrates}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								<Field.Text
									type="number"
									name="nutrions.fat"
									label="Tłuszcze (g)"
									placeholder="Ilość tłuszczy w g..."
									step={0.1}
									value={values.nutrions.fat}
									errorMsg={errors.nutrions?.fat}
									isTouched={touched.nutrions?.fat}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>
						</div>
					</div>

					<div>
						<div className="md:w-96">
							<Header title="Składniki" hrColor="blue" />

							<Field.Dynamic
								name="ingredients"
								placeholder="Wprowadź składnik..."
								listType="list-disc"
								errorMsg={errors.ingredients}
								value={values.ingredients}
								setValue={setFieldValue}
							/>
						</div>

						<div className="md:w-96">
							<Header title="Przygotowanie" hrColor="green" />

							<Field.Dynamic
								name="steps"
								placeholder="Wprowadź krok..."
								listType="list-decimal"
								errorMsg={errors.steps}
								value={values.steps}
								setValue={setFieldValue}
							/>
						</div>
					</div>
				</div>

				<div className="my-12 flex justify-center items-center gap-5">
					<CustomLink href="/profile/recipes" color="red">
						Anuluj
					</CustomLink>
					<Button
						type="submit"
						color="green"
						disabled={!isValid || isSubmitting || !dirty}
						loadingMsg="Dodawanie">
						Dodaj
					</Button>
				</div>
			</form>
		</div>
	)
}

export default RecipeForm
