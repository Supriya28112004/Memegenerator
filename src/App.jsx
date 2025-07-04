import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Template from "./components/Template.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Memeeditor from "./components/Memeeditor.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      {/* <nav className="p-4 bg-gray-100 flex gap-4 justify-end">
        <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
        <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        <Link to="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
      </nav> */}

      {/* <nav className="p-4 bg-gray-100 flex gap-3 justify-end ">
  <Link
    to="/signup"
    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
  >
    Sign Up
  </Link>
  <Link
    to="/login"
    className="px-4 py-2 bg-pink-800 text-white rounded hover:bg-pink-900 transition"
  >
    Log In
  </Link>
  {/* <Link
    to="/dashboard"
    className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition text-sm"
>Dashboard
    
  </Link> */}



      <Routes>
        <Route path="/" element={<Template />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Memeeditor />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
