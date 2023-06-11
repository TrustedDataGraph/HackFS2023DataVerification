import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "@modules/Home";
import { Dataset } from "@modules/Dataset";
import { DataActivities } from "@modules/DataActivities";

function App() {
  return (
    <div className=" h-screen px-8 py-6 ">
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/dataset/:id" element={<DataActivities />} />
      </Routes>
    </div>
  );
}

export default App;
