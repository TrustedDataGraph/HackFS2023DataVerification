import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Dashboard } from "@modules/Dashboard";

function App() {
  return (
    <div className=" min-h-screen bg-bodyBg   ">
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
