import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 5 characters, upper case letter, 1 lower case letter, 1 numeric digit

export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email.").required("Required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required")
});
