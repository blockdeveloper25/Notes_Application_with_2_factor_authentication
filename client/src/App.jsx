import { useState } from "react";
import { router } from "./routes";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-slate-900 h-screen">
      <div className="flex justify-center items-center h-screen">
        <SessionProvider>
          <RouterProvider router={router} />
        </SessionProvider>
      </div>
    </div>
  );
}

export default App;
