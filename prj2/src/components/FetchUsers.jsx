import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FetchUsers() {
  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://rest-api-bjno.onrender.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUserDetail(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <>
      {loading ? (
        // Render a spinner while data is being fetched
        <div className="spinner-container">
          <div className="spinner">
            <div className="lds-hourglass"></div>
          </div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {userDetail.map((person) => (
              <tr key={person._id}>
                <td>
                  <Link to={`/detail/${person._id}`}>{person.firstName}</Link>
                </td>
                <td>{person.lastName}</td>
                <td>{person.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
