import "./App.css";
import Home from "./Home/Home";
import Upload from "./Upload/Upload";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/download" element={<h1>downloading....</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;