import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ControlPanel from "./pages/ControlPanel";
import Login from "./pages/login";
import Menu from "./pages/Menu";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/control"
          element={
            <PrivateRoute>
              <ControlPanel />
            </PrivateRoute>
          }
        />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </>
  );
}

export default App;
