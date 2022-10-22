import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

const FILE_SIZE = 1024000;
// max 1mb

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
// supported formats: jpg, jpeg, gif, png

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wprowadź poprawny adres e-mail.")
    .required("Pole wymagane"),
  password: yup
    .string()
    .min(6, "Hasło powinno zawierać min 6 znaków")
    .matches(PASSWORD_REGEX, { message: "Hasło powinno zawierać dużą i małą literę oraz cyfrę" })
    .required("Pole wymagane"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Hasła nie są identyczne")
    .required("Pole wymagane")
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Wprowadź poprawny adres e-mail.")
    .required("Pole wymagane"),
  password: yup
    .string()
    .min(6)
    .required("Pole wymagane")
});

// TODO: add validationSchema for ingredients and steps arrays

export const recipeSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "Maksymalna ilość znaków wynosi 50")
    .required("Pole wymagane"),
  description: yup
    .string()
    .max(550, "Maksymalna ilość znaków wynosi 550")
    .required("Pole wymagane"),
  file: yup
    .mixed()
    .nullable()
    .test('fileSize', "Maksymalna wielkość pliku to 1mb", (value) => !value || (value && value.size <= FILE_SIZE))
    .test('fileType', "Nieobsługiwany format pliku", (value) => !value || (value && SUPPORTED_FORMATS.includes(value?.type))),
  details: yup.object().shape({
    duration: yup
      .number()
      .min(1, "Niedozwolona wartość")
      .integer("Niedozwolona wartość")
      .positive("Wartość nie może być ujemna")
      .required("Wprowadzona wartość nie jest liczbą"),
    level: yup
      .string()
      .required("Musisz wybrać jedną z dostępnych opcji"),
    portions: yup
      .number()
      .min(1, "Niedozwolona wartość")
      .integer("Niedozwolona wartość")
      .positive("Wartość nie może być ujemna")
      .required("Wprowadzona wartość nie jest liczbą"),
  }),
  nutrions: yup.object().shape({
    calories: yup
      .number()
      .min(0.1, "Niedozwolona wartość")
      .positive("Wartość nie może być ujemna")
      .required("Wprowadzona wartość nie jest liczbą"),
    protein: yup
      .number()
      .min(0.1, "Niedozwolona wartość")
      .positive("Wartość nie może być ujemna")
      .required("Wprowadzona wartość nie jest liczbą"),
    carbohydrates: yup
      .number()
      .min(0.1, "Niedozwolona wartość")
      .positive("Wartość nie może być ujemna")
      .required("Wprowadzona wartość nie jest liczbą"),
    fat: yup
      .number()
      .min(0.1, "Niedozwolona wartość")
      .positive("Wartość nie może być ujemna")
      .required("Wprowadzona wartość nie jest liczbą")
  }),
});
