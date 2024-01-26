import React, { useState, useEffect } from "react";
// import { useSearchParams } from 'react-router-dom';
// const { loggedIn, setloggedIn } = useContext(LoginContext);
export default function useCurrentUser() {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      let id = localStorage.getItem("userId");
      if (!id) {
        return;
      }
      fetch(`https://rest-api-bjno.onrender.com/id/${id}`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUser(data);
        });
    }
  }, []);
  return user;
}
