import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "@modules/Home";
import { Dataset } from "@modules/Dataset";
import { DataActivities } from "@modules/DataActivities";
import { Reviewer } from "@modules/Reviewer";

function App() {
  return (
    <div className=" h-screen px-8 py-2 ">
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/dataset/:id" element={<DataActivities />} />
        <Route path="/reviewer/:id" element={<Reviewer />} />
      </Routes>
    </div>
  );
}

export default App;
