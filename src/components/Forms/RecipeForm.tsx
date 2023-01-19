import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { roundToTwo } from '../../lib/helpers/roundToTwo';
import { IRecipe } from '../../lib/interfaces/recipe';
import { recipeSchema } from '../../lib/schemas/schemas';
import LoadingButton from '../UI/LoadingButton/LoadingButton';
import DynamicField from './Fields/DynamicField';
import Field from './Fields/Field';
import FileField from './Fields/FileField';
import NumberField from './Fields/NumberField';
import SelectField from './Fields/SelectField';
import SwitchField from './Fields/SwitchField';
import TextField from './Fields/TextField';
import TextareaField from './Fields/TextareaField';

interface props {
	recipe?: IRecipe;
	onSubmit: (recipe: IRecipe) => void;
	buttonText: string;
}

function RecipeForm({ recipe, onSubmit, buttonText }: props): JSX.Element {
	const [loading, setLoading] = useState(false);
	const {
		values,
		errors,
		touched,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit
	} = useFormik({
		initialValues: recipe || {
			name: '',
			description: '',
			img: '',
			file: null,
			details: {
				duration: 0,
				level: '',
				portions: 0
			},
			nutrions: {
				calories: 0,
				protein: 0,
				carbohydrates: 0,
				fat: 0
			},
			ingredients: [],
			steps: [],
			status: false
		},
		validationSchema: recipeSchema,
		onSubmit: async (values: IRecipe) => {
			setLoading(true);
			onSubmit({
				name: values.name.trim().replace(/  +/g, ' '),
				description: values.description.trim().replace(/  +/g, ' '),
				file: values.file,
				details: {
					duration: +values.details.duration,
					level: values.details.level,
					portions: +values.details.portions
				},
				nutrions: {
					calories: roundToTwo(+values.nutrions.calories),
					protein: roundToTwo(+values.nutrions.protein),
					carbohydrates: roundToTwo(+values.nutrions.carbohydrates),
					fat: roundToTwo(+values.nutrions.fat)
				},
				ingredients: values.ingredients
					.filter((item) => item.length > 0)
					.map((item) => item.trim().replace(/  +/g, ' ')),
				steps: values.steps
					.filter((item) => item.length > 0)
					.map((item) => item.trim().replace(/  +/g, ' ')),
				status: values.status
			});
			setLoading(false);
		}
	});

	// console.log(values.file);

	return (
		<div className="mx-7 md:mx-auto lg:w-[60rem] xl:w-[70rem]">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-7">
					<div>
						<div className="md:w-96">
							<h2 className="font-bold text-2xl text-center text-black dark:text-white">
								Główne informacje
							</h2>
							<hr className="mt-2 mb-7 border-4 border-amber-600" />
							{/* <Field
								label="Nazwa"
								type="text"
								name="name"
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.name}
								touch={touched.name}
								placeholder="Podaj nazwę potrawy..."
							/> */}
							<TextField
								name="name"
								label="Nazwa"
								placeholder="Podaj nazwę potrawy..."
								value={values.name}
								error={errors.name}
								touched={touched.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							<TextareaField
								name="description"
								label="Opis"
								placeholder="Opisz swoją potrawę..."
								value={values.description}
								error={errors.description}
								touched={touched.description}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{/* <Field
								label="Opis"
								type="textarea"
								name="description"
								value={values.description}
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors?.description}
								touch={touched?.description}
								placeholder="Opisz swoją potrawę..."
							/> */}
							<FileField
								name="file"
								label="Zdjęcie (podgląd)"
								error={errors.file}
								onChange={(value) => {
									setFieldValue('file', value);
								}}
								imgSrc={recipe?.img || ''}
								file={values.file || null}
							/>
							{/* <Field
								label="Zdjęcie (podgląd)"
								type="file"
								name="file"
								img={recipe?.img || ''}
								file={values.file || null}
								onChange={(value) => {
									setFieldValue('file', value);
								}}
								error={errors.file}
							/> */}
							<SwitchField
								name="status"
								label="Status"
								value={values.status}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{/* <Field
								label="Status"
								type="switch"
								name="status"
								value={values.status}
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.status}
								touch={touched.status}
							/> */}

							<div className="flex flex-nowrap justify-between gap-3">
								<NumberField
									name="details.duration"
									label="Czas (min)"
									placeholder="Minut..."
									step={1}
									value={values.details.duration}
									error={errors.details?.duration}
									touched={touched.details?.duration}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								{/* <Field
									label="Czas (min)"
									type="number"
									name="details.duration"
									value={values.details.duration}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.details?.duration}
									touch={touched.details?.duration}
									placeholder="Minutes..."
								/> */}

								{/* <Field
									label="Porcje (sztuk)"
									type="number"
									name="details.portions"
									value={values.details.portions}
									onChange={handleChange}
									onBlur={handleBlur}
									error={errors.details?.portions}
									touch={touched.details?.portions}
									placeholder="np. 10 sztuk..."
								/> */}

								<NumberField
									name="details.portions"
									label="Porcje (sztuk)"
									placeholder="np. 10 sztuk..."
									step={0.1}
									value={values.details.portions}
									error={errors.details?.portions}
									touched={touched.details?.portions}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>

							{/* <Field
								label="Trudność"
								type="select"
								name="details.level"
								value={values.details.level}
								onChange={handleChange}
								onBlur={handleBlur}
								options={['Łatwe', 'Średnie', 'Trudne']}
								error={errors.details?.level}
								touch={touched.details?.level}
							/> */}

							<SelectField
								name="details.level"
								label="Trudność"
								value={values.details.level}
								options={['Łatwe', 'Średnie', 'Trudne']}
								error={errors.details?.level}
								touched={touched.details?.level}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>

						<div className="md:w-96">
							<h2 className="font-bold text-2xl text-center text-black dark:text-white">
								Wartości odżywcze
							</h2>
							<hr className="mt-2 mb-7 border-4 border-rose-700" />

							<NumberField
								name="nutrions.calories"
								label="Kalorie (kcal)"
								placeholder="Liczba kalorii..."
								step={0.1}
								value={values.nutrions.calories}
								error={errors.nutrions?.calories}
								touched={touched.nutrions?.calories}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

							{/* <Field
								label="Kalorie (kcal)"
								type="number"
								name="nutrions.calories"
								value={values.nutrions.calories}
								onChange={handleChange}
								onBlur={handleBlur}
								error={errors.nutrions?.calories}
								touch={touched.nutrions?.calories}
								step={0.1}
								placeholder="Liczba kalorii..."
							/> */}

							<div className="flex flex-col md:flex-row md:gap-3">
								{/* <Field
									label="Białko (g)"
									type="number"
									name="nutrions.protein"
									value={values.nutrions.protein}
									onChange={handleChange}
									onBlur={handleBlur}
									step={0.1}
									error={errors.nutrions?.protein}
									touch={touched.nutrions?.protein}
									placeholder="Ilość białka w g..."
								/> */}

								<NumberField
									name="nutrions.protein"
									label="Białko (g)"
									placeholder="Ilość białka w g..."
									step={0.1}
									value={values.nutrions.protein}
									error={errors.nutrions?.protein}
									touched={touched.nutrions?.protein}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								{/* <Field
									label="Węglowodany (g)"
									type="number"
									name="nutrions.carbohydrates"
									value={values.nutrions.carbohydrates}
									onChange={handleChange}
									onBlur={handleBlur}
									step={0.1}
									error={errors.nutrions?.carbohydrates}
									touch={touched.nutrions?.carbohydrates}
									placeholder="Ilość węglowodanów w g..."
								/> */}

								<NumberField
									name="nutrions.carbohydrates"
									label="Węglowodany (g)"
									placeholder="Ilość węglowodanów w g..."
									step={0.1}
									value={values.nutrions.carbohydrates}
									error={errors.nutrions?.carbohydrates}
									touched={touched.nutrions?.carbohydrates}
									onChange={handleChange}
									onBlur={handleBlur}
								/>

								{/* <Field
									label="Tłuszcze (g)"
									type="number"
									name="nutrions.fat"
									value={values.nutrions.fat}
									onChange={handleChange}
									onBlur={handleBlur}
									step={0.1}
									error={errors.nutrions?.fat}
									touch={touched.nutrions?.fat}
									placeholder="Ilość tłuszczy w g..."
								/> */}

								<NumberField
									name="nutrions.fat"
									label="Tłuszcze (g)"
									placeholder="Ilość tłuszczy w g..."
									step={0.1}
									value={values.nutrions.fat}
									error={errors.nutrions?.fat}
									touched={touched.nutrions?.fat}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
							</div>
						</div>
					</div>

					<div>
						<div className="md:w-96">
							<h2 className="font-bold text-2xl text-center text-black dark:text-white">
								Lista składników
							</h2>
							<hr className="mt-2 mb-7 border-4 border-blue-700" />

							<DynamicField
								placeholder="Wprowadź składnik..."
								type="list-disc"
								value={values.ingredients}
								setValue={(value) => setFieldValue('ingredients', value)}
							/>
						</div>

						<div className="md:w-96">
							<h2 className="font-bold text-2xl text-center text-black dark:text-white">
								Przygotowanie
							</h2>
							<hr className="mt-2 mb-7 border-4 border-green-700" />

							<DynamicField
								placeholder="Wprowadź krok..."
								type="list-decimal"
								value={values.steps}
								setValue={(value) => setFieldValue('steps', value)}
							/>
						</div>
					</div>
				</div>

				<div className="my-12 flex justify-center items-center gap-5">
					<Link
						to={'/profil/przepisy'}
						className="p-2.5 text-sm font-bold rounded-lg focus:ring-4 focus:outline-none text-white bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-700 focus:ring-red-200 dark:focus:ring-red-800">
						Anuluj
					</Link>
					<LoadingButton loading={loading} loadingMessage="Dodawanie...">
						{buttonText}
					</LoadingButton>
				</div>
			</form>
		</div>
	);
}

export default RecipeForm;
