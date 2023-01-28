import { useFormik } from 'formik';
import { roundToTwo } from '../../lib/helpers/roundToTwo';
import { IRecipe } from '../../lib/interfaces/recipe';
import { recipeSchema } from '../../lib/schemas/schemas';
import Button from '../UI/Button';
import CustomLink from '../UI/CustomLink';
import {
	DynamicField,
	FileField,
	NumberField,
	SelectField,
	SwitchField,
	TextField,
	TextareaField
} from './Fields';

interface props {
	recipe?: IRecipe;
	loading: boolean;
	buttonText: string;
	submitForm: (recipe: IRecipe) => void;
}

const INITIAL_VALUES = {
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
};

function RecipeForm({
	recipe,
	loading,
	buttonText,
	submitForm
}: props): JSX.Element {
	const {
		values,
		errors,
		touched,
		setFieldValue,
		handleBlur,
		handleChange,
		handleSubmit
	} = useFormik({
		initialValues: recipe || INITIAL_VALUES,
		validationSchema: recipeSchema,
		onSubmit: async (values: IRecipe) => {
			const filteredValues = {
				name: values.name.trim().replace(/  +/g, ' '),
				description: values.description.trim().replace(/  +/g, ' '),
				status: values.status,
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
					.map((item) => item.trim().replace(/  +/g, ' '))
			};

			submitForm(filteredValues);
		}
	});

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

							<SwitchField
								name="status"
								label="Status"
								value={values.status}
								onChange={handleChange}
								onBlur={handleBlur}
							/>

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

							<SelectField
								name="details.level"
								label="Trudność"
								value={values.details.level}
								options={[
									{ display: 'Łatwy', value: 'easy' },
									{ display: 'Średni', value: 'medium' },
									{ display: 'Trudny', value: 'hard' }
								]}
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

							<div className="flex flex-col md:flex-row md:gap-3">
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
					<CustomLink href="/profil/przepisy" color="red">
						Anuluj
					</CustomLink>
					<Button type="submit" color="green" disabled={loading}>
						{!loading ? buttonText : 'Zapisywanie'}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default RecipeForm;
