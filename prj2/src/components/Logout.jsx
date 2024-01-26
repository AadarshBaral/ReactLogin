import React from "react";
import { LoginContext } from "../Context/LoginContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function Logout() {
  return <Navigate to="/login" />;
}
