import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Delete from "./Delete";
import { Link } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
export default function PersonDetail() {
  const user = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const [users, setUsers] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [userData, setuserData] = useState(null);

  useEffect(() => {
    fetch("https://rest-api-bjno.onrender.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
        setBusy(false);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://rest-api-bjno.onrender.com/update/${params.userId}`, {
      method: "PATCH", // Use PATCH method for partial updates
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
      .then((data) => {})
      .catch((error) => {
        // console.error("Update failed:", error.message);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setuserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  useEffect(() => {
    if (!isBusy) {
      const user = users.find((user) => user._id === params.userId);
      const { firstName, lastName, email, password } = user;
      setuserData({ firstName, lastName, email, password });
    }
  }, [isBusy, params.userId, users]);

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner">
            <div className="lds-hourglass"></div>
          </div>
        </div>
      ) : (
        <div className="personDetail">
          {/* <h1 className="feedHeader">PersonDetail</h1> */}
          {userData && (
            <form onSubmit={handleSubmit}>
              <div className="loginHeader">Update User</div>
              <label>
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={userData.firstName} // Set the value from the state
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={userData.lastName}
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
                  value={userData.email}
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
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <button className="btn" type="submit">
                Update
              </button>
              <Link to={`/delete/${params.userId}`}>
                <button className="deleteButton">Delete User</button>
              </Link>
            </form>
          )}
        </div>
      )}
    </>
  );
}
