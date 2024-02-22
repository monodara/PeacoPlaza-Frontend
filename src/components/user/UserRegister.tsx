import React, { useState } from "react";

import { UserRegisterType } from "../../misc/type";
import axios from "axios";
import { error } from "console";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

  function onSubmit(values: UserRegisterType) {
    //send user information to backend
    setUserInformation(values);
    console.log(values);
    axios
      .post("https://api.escuelajs.co/api/v1/users/", values)
      .then((response) => {
        console.log(response, "res");
        if (response.status === 201) {
          // return user data
          // save information to redux
          dispatch(saveUserInformation(response.data));
          // navigate user to log in
          navigate("/profile");
        }
      })
      .catch((error) => {
        dispatch(saveUserInformation({ ...values, role: "customer", id: 100 }));
        navigate("/profile");
        console.log(error);
      });
  }
  return (
    <div>
      <h1>UserRegister</h1>
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
                width: 500,
                maxWidth: "100%",
                margin: "0 auto", // Horizontally center the form fields and button
              }}
            >
              <Field
                as={TextField}
                fullWidth
                label="Name"
                id="name"
                name="name"
                error={errors.name && touched.name}
                helperText={<ErrorMessage name="name" />}
                // onChange={onChangeHandler}
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                id="email"
                name="email"
                error={errors.email && touched.email}
                helperText={<ErrorMessage name="email" />}
                // onChange={onChangeHandler}
              />
              <Field
                as={TextField}
                fullWidth
                label="Password"
                id="password"
                name="password"
                error={errors.password && touched.password}
                helperText={<ErrorMessage name="password" />}
                // onChange={onChangeHandler}
              />
              <Field
                as={TextField}
                fullWidth
                label="Avatar"
                id="avatar"
                name="avatar"
                error={errors.avatar && touched.avatar}
                helperText={<ErrorMessage name="avatar" />}
                // onChange={onChangeHandler}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ display: "block", margin: "20px auto" }}
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
