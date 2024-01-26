import React, { useEffect, useContext } from "react";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import toast from "react-hot-toast";
import { LoginContext } from "../Context/LoginContext";
import { useLoginContext } from "../Context/LoginContext";
export default function Login() {
  const { loggedIn, setloggedIn } = useLoginContext();
  const navigate = useNavigate();
  let [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const checkLength = () => {
    return userData.password.length >= 7;
  };
  const checkNumber = () => {
    return /\d/.test(userData.password);
  };
  const checkUpperCase = () => {
    return /[A-Z]/.test(userData.password);
  };
  const checkLowerCase = () => {
    return /[a-z]/.test(userData.password);
  };
  const checkEmpty = () => {
    return userData.password.trim();
  };

  const handleChange = (e) => {
    let val = e.target.value;
    if (e.target.type === "password") {
      //length check
      if (val.length >= 8) {
        document.querySelector(".eight_char").style.color = "#94ff66";
      } else {
        document.querySelector(".eight_char").style.color = "#a0a0a0";
      }
      //lowercase check
      if (/[a-z]/.test(val)) {
        document.querySelector(".one_low").style.color = "#94ff66";
      } else {
        document.querySelector(".one_low").style.color = "#a0a0a0";
      }
      //uppercase check
      if (/[A-Z]/.test(val)) {
        document.querySelector(".one_up").style.color = "#94ff66";
      } else {
        document.querySelector(".one_up").style.color = "#a0a0a0";
      }
    }

    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    // Validation checks
    if (!emailRegex.test(userData.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!passwordRegex.test(userData.password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    fetch("https://rest-api-bjno.onrender.com/register", {
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
        // handle successful registration
        toast("Registration Success!");
        localStorage.setItem("userId", data._id);
        setloggedIn(true);
        navigate("/login");
      })
      .catch((error) => {
        // handle registration error
        // console.error("Registration failed:", error.message);
        toast.error("Registration Failed");
      });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="loginHeader">Register</div>
          <LoginInput
            props={{
              label: "FirstName",
              name: "firstName",
              type: "name",
              handleChange,
              value: userData.firstName,
            }}
          />
          <LoginInput
            props={{
              label: "Lastname",
              name: "lastName",
              type: "name",
              handleChange,
              value: userData.lastName,
            }}
          />

          <br />
          <LoginInput
            props={{
              label: "Email",
              name: "email",
              type: "email",
              handleChange,
              value: userData.email,
            }}
          />

          <br />
          <LoginInput
            props={{
              label: "Password",
              name: "password",
              type: "password",
              handleChange,
              value: userData.password,
            }}
          />

          <br />

          <p className="password_check eight_char">Atleast 8 characters</p>
          <p className="password_check one_up">Atleast 1 uppercase character</p>
          <p className="password_check one_low">
            Atleast 1 lowercase character
          </p>

          <button className="btn" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
