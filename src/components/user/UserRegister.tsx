import React, { useState } from "react";

import { UserRegister } from "../../misc/type";
import axios from "axios";
import { error } from "console";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveUserInformation } from "../../redux/slices/userSlice";

export default function UserRegisterForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userInformation, setUserInformation] = useState<UserRegister>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setUserInformation({
      ...userInformation,
      [event.target.name]: event.target.value,
    });
  }

  function onClickHandler() {
    //send user information to backend
    axios
      .post("https://api.escuelajs.co/api/v1/users/", userInformation)
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
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <h1>UserRegister</h1>
      <input
        value={userInformation.name}
        name="name"
        type="text"
        onChange={onChangeHandler}
      />
      <input
        value={userInformation.email}
        name="email"
        type="text"
        onChange={onChangeHandler}
      />
      <input
        value={userInformation.password}
        name="password"
        type="text"
        onChange={onChangeHandler}
      />
      <input
        value={userInformation.avatar}
        name="avatar"
        type="text"
        onChange={onChangeHandler}
      />
      <button onClick={onClickHandler}> Register</button>
    </div>
  );
}
