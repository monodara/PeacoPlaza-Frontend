import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import axios from "axios";

export default function UserProfile() {
  const [userForm, setUserForm] = useState();

  // form enter email + password
  // send post,https://api.escuelajs.co/api/v1/auth/login
  // body:

  // get user information
  const user = useSelector((state: AppState) => state.users.user);

  if (!user) {
    return <div> no user</div>;
  }

  //token from  local storage
  const token = localStorage.getItem("token");

  // send token with fetch
  fetch("https://api.escuelajs.co/api/v1/auth/profile", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // send token with axios
  axios.post("https://api.escuelajs.co/api/v1/auth/profile", userForm, {
    headers: {
      Authorization: "Bearer {your access token}",
    },
  });

  return (
    <div>
      <h1>UserProfile</h1>
      <p> name: {user.name}</p>
    </div>
  );
}
