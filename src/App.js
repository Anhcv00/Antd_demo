import { useRef, useState } from "react";
import "antd/dist/reset.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Photos from "./components/Photos.js";
import PhotoDetails from "./components/PhotoDetails.js";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Photos />} />
          <Route path="/photos/:id" element={<PhotoDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
