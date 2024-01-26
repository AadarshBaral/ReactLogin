import React from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLoginContext } from "../Context/LoginContext";
export default function Navbar() {
  const { loggedIn, setloggedIn } = useLoginContext();
  const navigate = useNavigate();
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
            <div>
              {" "}
              {loggedIn ? (
                <div className="nav2">
                  <button
                    className="navLink"
                    onClick={() => {
                      localStorage.removeItem("userId");
                      toast("Logout Success");
                      navigate("/login");
                      setloggedIn(false);
                    }}
                  >
                    Logout
                  </button>

                  <Link className="navLink profile" to={"/profile"}>
                    Profile
                  </Link>
                </div>
              ) : (
                <div className="nav-container">
                  <div>
                    <Link className="navLink" to="/login">
                      Login
                    </Link>
                  </div>
                  <div>
                    <Link className="navLink" to="/register">
                      {" "}
                      Register{" "}
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
