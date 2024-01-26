import { useState, useEffect } from "react";
import { LoginContext } from "./LoginContext";

const LoginContextProvider = ({ children }) => {
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      console.log("value set");
      setloggedIn(true);
      console.log(setloggedIn);
    } else {
      setloggedIn(false);
    }
  }, [loggedIn]);

  return (
    <LoginContext.Provider value={{ loggedIn, setloggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
export default LoginContextProvider;
