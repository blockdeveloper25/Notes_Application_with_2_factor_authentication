import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const HomePage = () => {
  const nav = useNavigate();
  const { user, logout } = useSession();

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Welcome {user.username}</h2>
      <p>Verify your 2FA</p>
      <button
        type="button"
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default HomePage;
