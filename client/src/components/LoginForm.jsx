import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {};
  const handleRegister = () => {};
  return (
    <form
      onSubmit={isRegister ? handleRegister() : handleLogin()}
      className="p-4 bg-white rounded-lg shadow-md w-full max-w-sm mx-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          {isRegister ? "Create Account" : "Login"}{" "}
        </h2>
      </div>
      <hr className="text-gray-200 my-6" />
      <p className="text-center text-gray-600 text-lg font-light ">
        {isRegister
          ? "Looks Like you are new here"
          : "We are glad to see you again"}
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label className="text-gray-600 text-sm"> Username</label>
          <input
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg mt-2"
            placeholder="Enter Your Username"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-600 text-sm"> Password</label>
          <input
            type="text"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg mt-2"
            placeholder="Enter Your Password"
            required
          />
        </div>
        {isRegister ? (
          <div className="mb-4">
            <label className="text-gray-600 text-sm">Confirm Password</label>
            <input
              type="text"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Enter Your Confirm Password"
              required
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        {isRegister ? "Register" : "Login"}
      </button>
      <div>
        <p className="pt-4 text-center text-gray-600 text-sm ">
          {isRegister ? "Already have an account" : "Don't have an account"} ?{" "}
          <Link to="" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login" : "Create Account"}
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
