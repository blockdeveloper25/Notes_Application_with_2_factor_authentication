import React from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const handleLoginSuccess = (userData) => {
    console.log("logged in user Data: ", userData);
    login(userData);
    if (!userData.isMfaActive) {
      navigate("/setup-2fa");
    } else {
      navigate('/verify-2fa')
    }
  };
  return (
    <div>
      {" "}
      <LoginForm onLoginSccess={handleLoginSuccess} />{" "}
    </div>
  );
};

export default LoginPage;
