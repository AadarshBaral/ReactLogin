import React from "react";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Logout() {
  const navigate = useNavigate();
  const { loggedIn, setloggedIn } = useContext(LoginContext);

  let logout = () => {
    setloggedIn(false);
    localStorage.removeItem("userId");

    useEffect(() => {
      navigate("/login");
    }, []);
  };
  logout();
  return <div>LoggedOut</div>;
}
