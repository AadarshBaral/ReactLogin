import React from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";
export default function Navbar() {
  const { loggedIn, setloggedIn } = useContext(LoginContext);

  return (
    <>
      <div className="max-width-container">
        <div className="navbar">
          <div>
            <Link to="/">
              {" "}
              <p className="logo">Logo</p>
            </Link>
          </div>

          <div className="links">
            <div className="navLink">
              {" "}
              <Link to="/">Feed </Link>
            </div>
            <div >
              {" "}
              {loggedIn ? (
                <Link className="navLink" to="/logout">Logout</Link>
              ) : (
                <div className="nav-container">
                  <div >
                    <Link className="navLink" to="/login">
                      Login
                    </Link>
                  </div>
                  <div >
                    <Link  className="navLink" to="/register">
                      {" "}    Register{" "}  
                    </Link>
                
                  </div>
                </div>
              )}
            </div>
         
          </div>
        </div>
      </div>
    </>
  );
}
