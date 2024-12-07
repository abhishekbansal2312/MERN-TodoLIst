import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoItem from "./components/TodoItem";
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // State to track whether the user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem("authtoken"); // Check for a stored token
    if (token) {
      setIsAuthenticated(true); // Set authenticated state
    }
  }, []);

  return (
    <Router>
      {/* Pass the authentication state and setter to Header */}
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/todos/:id" element={<TodoItem />} />
        <Route path="/" element={<TodoList />} />
        <Route path="/todos/add" element={<TodoAdd />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
