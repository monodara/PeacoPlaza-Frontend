import { object, string } from "yup";
export const userRegisterSchema = object().shape({
    username: string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: string().email("Invalid email").required("Required"),
    password: string()
      .min(8, "Too short!")
      .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ).required("Required"),
    // avatar: string().required("Required"),
  });