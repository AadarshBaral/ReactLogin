import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
export default function Login() {
  const { loggedIn, setloggedIn } = useContext(LoginContext);

  const navigate = useNavigate();
  let [users, setUsers] = useState([]);
  const [isBusy, setBusy] = useState(true);

  const [filteredItem, setFilteredItem] = useState(null);
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

  useEffect(() => {
    fetch(" https://rest-api-bjno.onrender.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setBusy(false);
      });
  }, [users]);

  useEffect(() => {
    if (!isBusy) {
      const user = users.find((user) => user.email === userData.email);
      setFilteredItem(user);
    }
  }, [isBusy, users]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredItem) {
      if (filteredItem.password === userData.password) {
        setloggedIn(true);
        console.log(loggedIn);
        navigate("/");
        console.log("User login success");

        localStorage.setItem("userId", filteredItem._id);
      } else {
        console.log("Invalid Password");
      }
    } else {
      console.log("user not found");
      setloggedIn(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="loginHeader">Login</div>
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <input type="submit" />
      </form>
    </>
  );
}
