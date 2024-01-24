import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function FetchUsers() {
  let [userDetail, setUserDetail] = useState([]);
  useEffect(() => {
    fetch(" https://rest-api-bjno.onrender.com/users")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUserDetail(data);
      });
  }, []);
  return (
    <>
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
    </>
  );
}
