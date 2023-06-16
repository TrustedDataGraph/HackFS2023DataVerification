import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Home } from "@modules/Home";
import { Dataset } from "@modules/Dataset";
import { DataActivities } from "@modules/DataActivities";
import { Reviewer } from "@modules/Reviewer";
import { ethers } from "ethers";

function App() {
  const provider = new ethers.JsonRpcProvider(
    "https://stupefied-dijkstra:slang-dealer-xerox-karate-moody-item@nd-142-415-280.p2pify.com/rpc/v1",
    314159
  );
  console.log(provider.getSigner());
  return (
    <div className=" h-screen px-8 py-2 ">
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/dataset/:id" element={<DataActivities />} />
        <Route path="/reviewer" element={<Reviewer />} />
      </Routes>
    </div>
  );
}

export default App;
