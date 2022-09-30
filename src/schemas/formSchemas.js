import * as yup from "yup";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit

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

export const hotelSchema = yup.object().shape({
  name: yup
    .string()
    .required("Pole wymagane"),
  /* description: yup
    .string()
    .max(550, "Maksymalna ilość znaków wynosi 550")
    .required("Pole wymagane"), */
  city: yup
    .string()
    .required("Pole wymagane"),
  /* rooms: yup
    .string()
    .required("Pole wymagane") */
});
