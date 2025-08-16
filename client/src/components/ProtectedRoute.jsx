import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ProtectedRoute = () => {
  const {isLoggedIn,loading} = useSession()
  if (loading){
    return <div>Loading..</div>
  }
  console.log("the logged in usser is ",isLoggedIn)
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
