import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";      // matches Navbar.jsx
import Home from "./pages/Home";               // matches Home.jsx
import Result from "./pages/Result";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./components/Navbar.css";



function App() {
  return (
    <Router>
      <Navbar /> {/* top nav */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
