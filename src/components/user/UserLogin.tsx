import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, TextField, Button, Alert } from "@mui/material";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

import { saveUserInformation } from "../../redux/slices/userSlice";
import loginBg from "../../images/loginBg.jpg";
import { UserType } from "../../misc/type";
import { debounce } from "lodash";
import { useTheme } from "../contextAPI/ThemeContext";
import { inputFormStyles } from "../../misc/style";

type LoginInfo = {
  email: string;
  password: string;
};
export default function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  });
  // Form validation
  const userInfoSchema = object().shape({
    email: string().email("Invalid email").required("Required"),
    password: string()
      .min(6, "Too short. At least 6 charaters")
      .required("Required"),
  });

  function onSubmit(values: LoginInfo) {
    //send user information to backend
    setLoginInfo(values);
    axios
      .post("https://api.escuelajs.co/api/v1/auth/login", values)
      .then((response) => {
        if (response.status === 201) {
          // return access&refresh token
          axios
            .get("https://api.escuelajs.co/api/v1/auth/profile", {
              headers: {
                Authorization: `Bearer ${response.data.access_token}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                dispatch(saveUserInformation(res.data));
                navigate("/profile");
              }
            })
            .catch((e) => {
              alert(e.ErrorMessage);
            });
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.message);
        } else if (error.request) {
          alert("No response received from server");
        } else {
          alert("Error: " + error.message);
        }
      });
  }
  const debouncedSubmit = debounce(onSubmit, 1000);
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
      );
      const userInfo = await res.json();
      const { name, email, picture } = userInfo;
      const user: UserType = { name, email, avatar: picture, role: "admin" };
      dispatch(saveUserInformation(user));
      navigate("/profile");
    },
  });

  const { theme } = useTheme();
  const textPrimaryColor = theme.palette.text.primary;
  const backgroundColor = theme.palette.background.default;
  return (
    <div className="py-16">
      <div className="flex rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage: `url(${loginBg})`,
          }}
        ></div>
        <div
          className="w-full p-8 lg:w-1/2"
          style={{ backgroundColor: backgroundColor }}
        >
          <h2
            className="text-2xl font-semibold text-center"
            style={{ color: textPrimaryColor }}
          >
            Shop with GoBC
          </h2>
          <p
            className="text-xl text-center"
            style={{ color: textPrimaryColor }}
          >
            Welcome back!
          </p>
          <div
            className="flex items-center justify-center mt-4 rounded-lg shadow-md"
            onClick={() => loginWithGoogle()}
          >
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1
              className="px-4 py-3 w-5/6 text-center font-bold"
              style={theme.typography.button}
            >
              Log in with Google
            </h1>
          </div>
          <div className="mt-4 mb-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <div className="text-xs text-center text-gray-500 uppercase">
              or login with email
            </div>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <Formik
            style={{ width: "100%" }}
            validationSchema={userInfoSchema}
            initialValues={loginInfo}
            onSubmit={debouncedSubmit}
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
                  <div className="mt-8">
                    <button
                      className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                      type="submit"
                      style={theme.typography.button}
                    >
                      Login
                    </button>
                  </div>
                </Box>
              </Form>
            )}
          </Formik>

          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <a href="/register" className="text-xs text-gray-500 uppercase">
              Don't have an account? Register here.
            </a>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
