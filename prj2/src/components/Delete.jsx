import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

export default function Delete() {
  const params = useParams();
  const [isDeleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!window.confirm("Are you sure?")) {
    }
    fetch(`https://rest-api-bjno.onrender.com/delete/${params.userId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setDeleted(true);
          toast.success("Deleted User");
          navigate("/");
        } else {
          // console.error("Error deleting user");
          toast.error("Error Deleting user");
        }
      })
      .catch((error) => {
        // console.error("Error deleting user", error);
        toast.error("Error Deleting user");
      });
  }, [params.userId]);

  return <div></div>;
}
