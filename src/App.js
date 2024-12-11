import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./Login";
import AllTodos from "./AllTodos";
import CompletedTodos from "./CompletedTodos";
import AddTodo from "./AddTodo";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [todos, setTodos] = useState([]); // Shared state for todos
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      {isAuthenticated && (
        <nav>
          <Link to="/all-todos">All Todos</Link> |{" "}
          <Link to="/completed-todos">Completed Todos</Link> |{" "}
          <Link to="/add-todo">Add TODO</Link> |{" "}
          <Link
            to="/login"
            onClick={() => {
              localStorage.setItem("isAuthenticated", "false");
            }}
          >
            Logout
          </Link>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/all-todos"
          element={
            <ProtectedRoute>
              <AllTodos todos={todos} setTodos={setTodos} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/completed-todos"
          element={
            <ProtectedRoute>
              <CompletedTodos todos={todos} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-todo"
          element={
            <ProtectedRoute>
              <AddTodo todos={todos} setTodos={setTodos} />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
