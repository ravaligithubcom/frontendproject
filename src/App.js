import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import AirportDetail from "./AirportDetail";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/airport/:id" element={<AirportDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
