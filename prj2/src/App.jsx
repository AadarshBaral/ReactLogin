import { useContext, useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";
import FetchUsers from "./components/FetchUsers";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PersonDetail from "./components/PersonDetail";
import Delete from "./components/Delete";
import Logout from "./components/Logout";
import useCurrentUser from "./hooks/useCurrentUser";
import toast, { Toaster } from "react-hot-toast";
import Profile from "./components/Profile";
import { LoginContext, useLoginContext } from "./Context/LoginContext";
import LoginContextProvider from "./Context/LoginContextProvider";
function App() {
  const user = useCurrentUser();
  const { loggedIn } = useLoginContext();
  console.log(loggedIn);
  // let [loggedIn, setloggedIn] = useState(false);
  return (
    <>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "white",
            background: "green",
          },
        }}
      />
      <section>
        <Router>
          <Navbar />
          {loggedIn ? <AfterAuthRoutes /> : <BeforeAuthRoutes />}
        </Router>
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
      <Route path="/profile" element={<Profile />} />
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
