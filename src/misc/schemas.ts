import { number, object, string } from "yup";
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

  export const productSchema= object().shape({
      title: string().required("Title is required"),
      description: string().required("Description is required"),
      price: number()
        .required("Price is required")
        .positive("Price must be positive"),
      inventory: number()
        .required("Inventory is required")
        .min(0, "Inventory cannot be negative"),
      weight: number()
        .required("Weight is required")
        .positive("Weight must be positive"),
    });