import { useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginContext } from "./Context/LoginContext";
import "./App.css";

import FetchUsers from "./components/FetchUsers";
import Register from "./components/Register";
import Login from "./components/Login";
import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import PersonDetail from "./components/PersonDetail";
import Delete from "./components/Delete";
import Logout from "./components/Logout";
function App() {
  let [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    console.log(loggedIn)
  }, [loggedIn]);

  // console.log(loggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setloggedIn(true);
    } else {
      setloggedIn(false);
    }
  }, []);
  return (
    <>
      <section>
        <LoginContext.Provider value={{ loggedIn, setloggedIn }}>
          <Router>
            <Navbar />
            {loggedIn ? <AfterAuthRoutes /> : <BeforeAuthRoutes />}
          </Router>
        </LoginContext.Provider>
      </section>
    </>
  );
}

export default App;
const AfterAuthRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<FetchUsers />}></Route>
      <Route path="/logout" element={<Logout />}></Route>
      <Route path="/detail/:userId" element={<PersonDetail />} />
      <Route path="/delete/:userId" element={<Delete />} />
      <Route path="/*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};
const BeforeAuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};
