import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Delete from "./Delete";
import { Link } from "react-router-dom";
export default function PersonDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [popUp, setPopup] = useState(false);
  const [filteredItem, setFilteredItem] = useState(null);
  let [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    fetch("https://rest-api-bjno.onrender.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setIsLoading(false);
        setBusy(false);
      });
  }, []);
  const handleSubmit = (e) => {
    console.log(filteredItem);
    e.preventDefault();
    fetch(`https://rest-api-bjno.onrender.com/update/${params.userId}`, {
      method: "PATCH", // Use PATCH method for partial updates
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredItem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("User updated successfully!", data);
      })
      .catch((error) => {
        console.error("Update failed:", error.message);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setFilteredItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (!isBusy) {
      const user = users.find((user) => user._id === params.userId);
      const { firstName, lastName, email, password } = user;
      setFilteredItem({ firstName, lastName, email, password });
    }
  }, [isBusy, params.userId, users]);

  return (
    <div className="personDetail">
      <h1 className="feedHeader">PersonDetail</h1>
      {filteredItem && (
        // <ul>
        //   <li className="listItem">ID: {filteredItem._id}</li>
        //   <li className="listItem">First Name: {filteredItem.firstName}</li>
        //   <li className="listItem">Last Name: {filteredItem.lastName}</li>
        //   <li className="listItem">Email: {filteredItem.email}</li>
  
        // </ul>

        <form onSubmit={handleSubmit}>
          <div className="loginHeader">Update User</div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={filteredItem.firstName} // Set the value from the state
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={filteredItem.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={filteredItem.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={filteredItem.password}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button className="btn" type="submit">
            Update
          </button>
        </form>
      )}
      <div></div>
      
        <Link to={`/delete/${params.userId}`}>
            <button className="deleteButton">Delete User</button>
           </Link>
    </div>

  );
}
