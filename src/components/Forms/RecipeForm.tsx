import { FormikHelpers, useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { IRecipe } from '../../lib/interfaces/recipe';
import Button from '../UI/Button';
import CustomLink from '../UI/CustomLink';
import { buttonSpinner } from '../UI/SVG/buttonSpinner';
import {
	DynamicField,
	FileField,
	NumberField,
	SelectField,
	SwitchField,
	TextField,
	TextareaField
} from './Fields';
import RecipeFormHeader from './RecipeFormHeader';

interface props {
	buttonData: {
		title: string;
		loading: string;
	};
	initialValues: IRecipe;
	validationSchema: any;
	onSubmit: (
		values: IRecipe,
		formikHelpers: FormikHelpers<IRecipe>
	) => Promise<void>;
}

function RecipeForm({
	buttonData,
	initialValues,
	validationSchema,
	onSubmit
}: props): JSX.Element {
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
	} = useFormik({
		initialValues,
		validationSchema: toFormikValidationSchema(validationSchema),
		onSubmit
	});

	return (
		<div className="mx-7 md:mx-auto lg:w-[60rem] xl:w-[70rem]">
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row md:flex-wrap md:justify-center md:gap-7">
					<div>
						<div className="md:w-96">
							<RecipeFormHeader title="Główne informacje" hrColor="amber" />

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
								imgValue={values?.img || null}
								value={values.file || null}
							/>

							<SwitchField
								name="status"
								label="Status"
								value={values.status}
								onChange={handleChange}
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
									{ key: 'Łatwy', value: 'easy' },
									{ key: 'Średni', value: 'medium' },
									{ key: 'Trudny', value: 'hard' }
								]}
								error={errors.details?.level}
								touched={touched.details?.level}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
						</div>

						<div className="md:w-96">
							<RecipeFormHeader title="Wartości odżywcze" hrColor="rose" />

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
							<RecipeFormHeader title="Składniki" hrColor="blue" />

							<DynamicField
								placeholder="Wprowadź składnik..."
								type="list-disc"
								error={errors.ingredients}
								array={values.ingredients}
								setArray={(value) => setFieldValue('ingredients', value)}
							/>
						</div>

						<div className="md:w-96">
							<RecipeFormHeader title="Przygotowanie" hrColor="green" />

							<DynamicField
								placeholder="Wprowadź krok..."
								type="list-decimal"
								error={errors.steps}
								array={values.steps}
								setArray={(value) => setFieldValue('steps', value)}
							/>
						</div>
					</div>
				</div>

				<div className="my-12 flex justify-center items-center gap-5">
					<CustomLink href="/profil/przepisy" color="red">
						Anuluj
					</CustomLink>
					<Button
						type="submit"
						color="green"
						disabled={!isValid || isSubmitting || !dirty}>
						{isSubmitting ? (
							<>
								{buttonSpinner}
								{buttonData.loading}
							</>
						) : (
							buttonData.title
						)}
					</Button>
				</div>
			</form>
		</div>
	);
}

export default RecipeForm;
