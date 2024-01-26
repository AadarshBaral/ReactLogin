import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { LoginContext } from "../Context/LoginContext";
import toast, { Toaster } from "react-hot-toast";
import LoginInput from "./LoginInput";
import { useLoginContext } from "../Context/LoginContext";
export default function Login() {
  // const { loggedIn, setloggedIn } = useContext(LoginContext);
  const { loggedIn, setloggedIn } = useLoginContext();
  const navigate = useNavigate();
  let [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://rest-api-bjno.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setloggedIn(true);
        localStorage.setItem("userId", data.data._id);
        console.log(loggedIn);
        toast("Login Success");
        navigate("/");
      })
      .catch((error) => {
        console.error("login failed:", error.message);
        toast.error("login failed. Check Credentials");
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="loginHeader">Login</div>
        <LoginInput
          props={{
            label: "Email Here",
            name: "email",
            type: "text",
            handleChange,
            value: userData.email,
          }}
        />
        <LoginInput
          props={{
            label: "Password",
            name: "password",
            type: "password",
            handleChange,
            value: userData.password,
          }}
        />
        <input type="submit" />
      </form>
    </>
  );
}
