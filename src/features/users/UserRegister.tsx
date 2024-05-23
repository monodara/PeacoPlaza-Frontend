import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import { debounce } from "lodash";
import { useTheme } from "../../components/contextAPI/ThemeContext";
import { inputFormStyles } from "../../misc/style";
import { checkEmailUrl, userEndpoints } from "../../misc/endpoints";
import { UserCreateDto } from "./userDto";
import { useAppDispatch } from "../../redux/store";
import { usersActions } from "./userSlice";
import { userRegisterSchema } from "../../misc/schemas";

export default function UserRegisterForm() {
  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const [userInformation, setUserInformation] = useState<UserCreateDto>({
    username: "",
    email: "",
    password: "",
    // avatar: "",
  });
  // Form validation
  
async function checkEmail(email: string) {
    try {
      const response = await axios.post(checkEmailUrl, { email });
      return response.data; 
    } catch (error) {
      return false;
    }
  }

  async function onSubmit(
    values: UserCreateDto,
    { setFieldError }: FormikHelpers<UserCreateDto>
  ) {
    const emailAvailable = await checkEmail(values.email);
    if (!emailAvailable) {
      setFieldError("email", "Email is already registered");
      return;
    }

    dispatch(usersActions.createOne(values))
      .unwrap()
      .then((response) => {
        if (response) {
          alert("Successfully Registered. Now Log in with your email!")
          navigate("/login");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  return (
    <div className="py-6">
      <Formik
        style={{ width: "100%" }}
        initialValues={userInformation}
        validationSchema={userRegisterSchema}
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
                label="User Name"
                id="username"
                name="username"
                error={errors.username && touched.username}
                helperText={<ErrorMessage name="username" />}
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
              {/* <Field
                as={TextField}
                fullWidth
                label="Avatar"
                id="avatar"
                name="avatar"
                error={errors.avatar && touched.avatar}
                helperText={<ErrorMessage name="avatar" />}
                sx={inputFormStyles(textPrimaryColor)}
              /> */}
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
