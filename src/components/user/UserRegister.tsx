import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import { UserRegisterType } from "../../misc/type";
import { debounce } from "lodash";
import { useTheme } from "../contextAPI/ThemeContext";
import { inputFormStyles } from "../../misc/style";

export default function UserRegisterForm() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState<UserRegisterType>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  // Form validation
  const userInfoSchema = object().shape({
    name: string()
      .min(2, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: string().email("Invalid email").required("Required"),
    password: string()
      .min(8, "Too short!")
      .max(16, "Too long!")
      .required("Required"),
    avatar: string().required("Required"),
  });
  async function checkEmail(email: string) {
    try {
      const response = await axios.post<{ isAvailable: boolean }>(
        "https://api.escuelajs.co/api/v1/users/is-available",
        { email }
      );
      const { isAvailable } = response.data;
      return true; //As the API endpoint doesn't work, I force the function to return true
    } catch (error) {
      return true;
    }
  }
  const debouncedCheckEmail = debounce(checkEmail, 500);
  async function onSubmit(
    values: UserRegisterType,
    { setFieldError }: FormikHelpers<UserRegisterType>
  ) {
    const emailAvailable = await debouncedCheckEmail(values.email);
    // If email is not available, set field error for email input
    if (!emailAvailable) {
      setFieldError("email", "Email is already registered");
      return; // Exit the function early if email is not available
    }
    //send user information to backend
    setUserInformation(values);
    axios
      .post("https://api.escuelajs.co/api/v1/users/", values)
      .then((response) => {
        if (response.status === 201) {
          // navigate user to log in
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(error.response.data.message.join(", "));
        } else if (error.request) {
          // The request was made but no response was received
          alert("No response received from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          alert("Error: " + error.message);
        }
      });
  }
  return (
    <div className="py-6">
      <Formik
        style={{ width: "100%" }}
        initialValues={userInformation}
        validationSchema={userInfoSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form style={{ width: "100%" }}>
            <Box
              sx={{
                width: 360,
                maxWidth: "100%",
                margin: "0 auto", // Horizontally center the form fields and button
              }}
            >
              <Button
                variant="text"
                type="button"
                sx={theme.typography.body1}
                onClick={() => navigate("/login")}
              >
                Already have an account?
              </Button>
              <Field
                as={TextField}
                fullWidth
                label="Name"
                id="name"
                name="name"
                error={errors.name && touched.name}
                helperText={<ErrorMessage name="name" />}
                sx={inputFormStyles(textPrimaryColor)}
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                id="email"
                name="email"
                error={errors.email && touched.email}
                helperText={<ErrorMessage name="email" />}
                sx={inputFormStyles(textPrimaryColor)}
              />
              <Field
                as={TextField}
                fullWidth
                label="Password"
                id="password"
                name="password"
                error={errors.password && touched.password}
                helperText={<ErrorMessage name="password" />}
                sx={inputFormStyles(textPrimaryColor)}
              />
              <Field
                as={TextField}
                fullWidth
                label="Avatar"
                id="avatar"
                name="avatar"
                error={errors.avatar && touched.avatar}
                helperText={<ErrorMessage name="avatar" />}
                sx={inputFormStyles(textPrimaryColor)}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ ...theme.typography.button, borderRadius: 1 }}
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
}
