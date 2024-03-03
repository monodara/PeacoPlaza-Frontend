import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { UserRegisterType } from "../../misc/type";

export default function ProductCreation() {
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
          //   dispatch(saveUserInformation(response.data));
          // navigate user to log in
          //   navigate("/profile");
        }
      })
      .catch((error) => {
        // dispatch(saveUserInformation({ ...values, role: "customer", id: 100 }));
        // navigate("/profile");
        console.log(error);
      });
  }
  return (
    <div>
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
