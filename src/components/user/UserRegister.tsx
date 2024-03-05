import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import { UserRegisterType } from "../../misc/type";
import { saveUserInformation } from "../../redux/slices/userSlice";

export default function UserRegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      return isAvailable;
    } catch (error) {
      return false;
    }
  }
  async function onSubmit(
    values: UserRegisterType,
    { setFieldError }: FormikHelpers<UserRegisterType>
  ) {
    const emailAvailable = await checkEmail(values.email);
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
          // return user data
          // save information to redux
          dispatch(saveUserInformation(response.data));
          // navigate user to log in
          navigate("/profile");
        }
      })
      .catch((error) => {
        alert(error.ErrorMessage);
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
                width: 300,
                maxWidth: "100%",
                margin: "0 auto", // Horizontally center the form fields and button
              }}
            >
              <Button
                variant="text"
                type="button"
                sx={{ display: "block", margin: "20px auto" }}
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
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                id="email"
                name="email"
                error={errors.email && touched.email}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Password"
                id="password"
                name="password"
                error={errors.password && touched.password}
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Avatar"
                id="avatar"
                name="avatar"
                error={errors.avatar && touched.avatar}
                helperText={<ErrorMessage name="avatar" />}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  display: "block",
                  margin: "20px auto",
                  backgroundColor: "#72BD41",
                }}
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
