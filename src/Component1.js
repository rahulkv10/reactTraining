import React, { useState } from "react";
import "./Component1.css";

export const Component1 = ({ todoItems, onAddTodo, onDeleteTodo, onEditTodo }) => {
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState("");

  const validateTodo = (todo) => {
    if (todo.trim() === "") {
      setError("TODO text cannot be empty.");
      return false;
    } else if (todo.trim().length < 3) {
      setError("TODO text must be at least 3 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (validateTodo(newTodo)) {
      onAddTodo(newTodo.trim());
      setNewTodo("");
    }
  };

  return (
    <div className="component1-container">
      <h1 className="title">To Do Items</h1>
      <form className="add-todo" onSubmit={handleAdd}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="todo-list">
        {todoItems.map((item, index) => (
          <div className="todo-item" key={index}>
            <span>{item}</span>
            <button onClick={() => onDeleteTodo(index)}>Delete</button>
            <button
              onClick={() => {
                const updatedTodo = prompt("Edit TODO", item);
                if (updatedTodo) {
                  onEditTodo(index, updatedTodo);
                }
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
