import "./App.css";
import Home from "./Home/Home";
import Upload from "./Upload/Upload";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Download from "./Download/Download";
import NotFound from "./components/NotFound";
import Notdev from "./components/Notdev"
import { useEffect } from "react";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/download" element={<Download/>} />
          <Route exact path="/about" element={<Notdev text="Not yet developed 😢"/>} />
          <Route exact path="/contact" element={<Notdev text="gmail : sharathhv88@gmail.com      Not yet developed 😢"/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
